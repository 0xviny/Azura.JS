// src/core/Server.ts
import http from "http";
import cluster from "cluster";
import os from "os";
import { parse as parseQS } from "querystring";
import { Router } from "./Router";
import { Lifecycle } from "./Lifecycle";
import { PluginLoader, Plugin } from "./PluginLoader";
import { uuid, HTTPError, logger } from "./Utils";
import { applyDecorators } from "../decorators/Decorators";
import { DBAdapter } from "../db/Database";
import { RequestServer } from "./Request";
import { ResponseServer } from "./Response";

export interface ServerOptions {
  port?: number;
  https?: boolean;
  http2?: boolean;
  cluster?: boolean;
}

export type RequestHandler = (
  req: RequestServer,
  res: ResponseServer,
  next: (err?: any) => void
) => Promise<void> | void;

type InternalHandler = (ctx: {
  request: RequestServer;
  response: ResponseServer;
}) => Promise<void> | void;

function adaptRequestHandler(h: RequestHandler): InternalHandler {
  return async ({ request: req, response: res }) => {
    await new Promise<void>((resolve, reject) => {
      try {
        const maybe = h(req, res, (err) => (err ? reject(err) : resolve()));
        if (maybe instanceof Promise) {
          maybe.then(() => resolve()).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  };
}

export class AzuraServer {
  public router = new Router();
  public db?: DBAdapter;
  private life = new Lifecycle();
  private plugins = new PluginLoader(this);
  private server?: http.Server;
  private middlewares: RequestHandler[] = [];

  constructor(private opts: ServerOptions = {}) {
    if (this.opts.cluster && cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) cluster.fork();
      cluster.on("exit", () => cluster.fork());
      return;
    }
    this.server = http.createServer();
    this.server.on("request", this.handle.bind(this));
  }

  public load(controllers: any[]) {
    applyDecorators(this, controllers);
  }

  onHook(type: any, fn: Function) {
    this.life.add(type, fn);
  }

  decorate(name: string, value: any): void {
    (this as any)[name] = value;
  }

  public use(mw: RequestHandler) {
    this.middlewares.push(mw);
  }

  public onUpgrade(fn: (req: any, sock: any, head: any) => void) {
    this.server?.on("upgrade", fn);
  }

  public registerPlugin<API>(plugin: Plugin<API>, opts?: any): API | undefined {
    return this.plugins.register(plugin, opts);
  }

  public addRoute(method: string, path: string, ...handlers: RequestHandler[]) {
    const adapted = handlers.map(adaptRequestHandler);
    this.router.add(method, path, ...adapted);
  }

  public get = (p: string, ...h: RequestHandler[]) => this.addRoute("GET", p, ...h);
  public post = (p: string, ...h: RequestHandler[]) => this.addRoute("POST", p, ...h);
  public put = (p: string, ...h: RequestHandler[]) => this.addRoute("PUT", p, ...h);
  public delete = (p: string, ...h: RequestHandler[]) => this.addRoute("DELETE", p, ...h);
  public patch = (p: string, ...h: RequestHandler[]) => this.addRoute("PATCH", p, ...h);

  public listen(port = this.opts.port || 3000) {
    if (!cluster.isPrimary) {
      this.server!.listen(port, () => logger("info", `Worker listening on ${port}`));
    } else {
      this.server!.listen(port, () => logger("info", `Master listening on ${port}`));
    }
  }

  private async handle(rawReq: http.IncomingMessage, rawRes: http.ServerResponse) {
    const req = rawReq as RequestServer;
    const res = rawRes as ResponseServer;

    // ─── Helpers estilo Express ───────────────────────────────────────────
    res.set = (k, v) => {
      res.setHeader(k, v);
      return res;
    };
    res.get = (k) => {
      const val = res.getHeader(k);
      if (Array.isArray(val)) return val[0];
      return typeof val === "number" ? val : val?.toString();
    };
    res.status = (c) => {
      res.statusCode = c;
      return res;
    };
    res.send = (b) => {
      if (typeof b === "object") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(b));
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end(String(b));
      }
      return res;
    };
    res.json = (b) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(b));
      return res;
    };

    // ─── Parse URL, query, cookies, body ─────────────────────────────────
    const [urlPath, qs] = (req.url || "").split("?");
    req.path = urlPath || "/";
    // query → Record<string,string>
    const rawQuery = parseQS(qs || "");
    const safeQuery: Record<string, string> = {};
    for (const key in rawQuery) {
      const v = rawQuery[key];
      safeQuery[key] = Array.isArray(v) ? v[0] : v || "";
    }
    req.query = safeQuery;

    // cookies
    const cookieHeader = (req.headers["cookie"] as string) || "";
    req.cookies = cookieHeader.split(";").reduce<Record<string, string>>((acc, pair) => {
      const [k, ...vals] = pair.trim().split("=");
      if (k) acc[k] = decodeURIComponent(vals.join("="));
      return acc;
    }, {});

    req.params = {};

    // ip seguro
    const ipRaw = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const ipStr = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw;
    req.ip = ipStr.split(",")[0].trim();

    // body
    req.body = {};
    if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
      await new Promise<void>((resolve) => {
        let buf = "";
        // — dois argumentos em cada on()
        req.on("data", (chunk: Buffer | string) => {
          buf += chunk;
        });
        req.on("end", () => {
          try {
            const ct = (req.headers["content-type"] as string) || "";
            if (ct.includes("application/json")) {
              req.body = JSON.parse(buf);
            } else {
              const parsed = parseQS(buf);
              const b: Record<string, string> = {};
              for (const k in parsed) {
                const v = parsed[k];
                b[k] = Array.isArray(v) ? v[0] : v || "";
              }
              req.body = b;
            }
          } catch {
            req.body = {};
          }
          resolve();
        });
        // garante listener válido para “error”
        req.on("error", (err: Error) => {
          logger("error", "Request body parse error: " + err.message);
          resolve();
        });
      });
    }

    // ─── Encontrar rota e executar middlewares ───────────────────────────
    const errorHandler = (err: any) => {
      logger("error", err.message || err);
      res
        .status(err instanceof HTTPError ? err.status : 500)
        .json(
          err instanceof HTTPError ? err.payload : { error: err.message || "Internal Server Error" }
        );
    };

    try {
      const { handlers, params } = this.router.find(req.method || "GET", req.path);
      req.params = params;

      const chain = [...this.middlewares.map(adaptRequestHandler), ...handlers];
      let idx = 0;
      const next = async (err?: any) => {
        if (err) return errorHandler(err);
        if (idx < chain.length) {
          const fn = chain[idx++];
          await fn({ request: req, response: res }, next);
          await next();
        }
      };
      await next();
    } catch (err) {
      errorHandler(err);
    }
  }
}
