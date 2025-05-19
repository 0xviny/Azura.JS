import http from "node:http";
import cluster from "cluster";
import os from "os";
import net from "node:net";
import { serialize as serializeCookie } from "cookie";
import { parse as parseQS } from "querystring";

import { Lifecycle } from "../../plugins/lifecycle.plugin";
import { ConfigModule } from "../../shared/config/config.module";
import { Handler, Router } from "./route";
import { adaptRequestHandler, RequestHandler } from "../../shared/types/common.types";
import { HttpContext } from "../../shared/types/http-context.types";
import { Plugin } from "../../shared/types/plugin.types";
import { HttpError, logger } from "../../shared/utils/http.utils";
import { RequestServer } from "../../shared/types/request.types";
import { ResponseServer } from "../../shared/types/response.types";
import { PluginLoader } from "../../core/services/plugin-loader.service";
import { applyDecorators } from "../../shared/decorators/decorator.module";

// Define a flexible Plugins type for PluginLoader
interface DynamicPlugins {
  [key: string]: Plugin<any>;
}

function findAvailablePort(port: number): Promise<number> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(findAvailablePort(port + 1)));
    server.listen(port, () => {
      server.close(() => resolve(port));
    });
  });
}

export class AzuraServer {
  private opts: ReturnType<ConfigModule["getAll"]>;

  public router = new Router();
  private lifecycle = new Lifecycle();
  private plugins = new PluginLoader<DynamicPlugins>(this, {});
  private middlewares: RequestHandler[] = [];

  private server?: http.Server;
  private port: number = 3000;

  constructor() {
    const config = new ConfigModule();

    try {
      config.initSync();
    } catch (err: any) {
      console.error("[Azura] ❌ Falha ao carregar configuração:");
      console.error("        ", err.message);
      process.exit(1);
    }

    this.opts = config.getAll();
    this.init();
  }

  private async init() {
    this.port = await findAvailablePort(this.opts.server?.port || 3000);

    if (this.opts?.server?.cluster && cluster.isPrimary) {
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

  public onHook(type: any, fn: (ctx: HttpContext) => unknown | Promise<unknown>) {
    this.lifecycle.add(type, fn);
  }

  public decorate(name: string, value: any): void {
    (this as any)[name] = value;
  }

  public use(mw: RequestHandler) {
    this.middlewares.push(mw);
  }

  public onUpgrade(fn: (req: any, sock: any, head: any) => void) {
    this.server?.on("upgrade", fn);
  }

  public registerPlugin<API>(plugin: Plugin<API>, opts?: any): API | undefined {
    return this.plugins.register(plugin.name, plugin, opts);
  }

  public addRoute(method: string, path: string, ...handlers: RequestHandler[]) {
    const adapted = handlers.map(adaptRequestHandler);
    this.router.add(method, path, ...(adapted as unknown as Handler[]));
  }

  public get = (p: string, ...h: RequestHandler[]) => this.addRoute("GET", p, ...h);
  public post = (p: string, ...h: RequestHandler[]) => this.addRoute("POST", p, ...h);
  public put = (p: string, ...h: RequestHandler[]) => this.addRoute("PUT", p, ...h);
  public delete = (p: string, ...h: RequestHandler[]) => this.addRoute("DELETE", p, ...h);
  public patch = (p: string, ...h: RequestHandler[]) => this.addRoute("PATCH", p, ...h);

  public listen(port = this.port) {
    if (!this.server) return;

    const who = cluster.isPrimary ? "Master" : "Worker";
    this.server.listen(port, () => logger("info", `[${who}] listening on ${port}`));
  }

  private async handle(rawReq: RequestServer, rawRes: ResponseServer) {
    const req = rawReq;
    const res = rawRes;

    req.originalUrl = req.url || "";
    req.protocol = this.opts?.server?.https ? "https" : "http";
    req.secure = req.protocol === "https";
    req.hostname = String(req.headers["host"] || "").split(":")[0];
    req.subdomains = req.hostname.split(".").slice(0, -2);
    const ipsRaw = req.headers["x-forwarded-for"];
    req.ips = typeof ipsRaw === "string" ? ipsRaw.split(/\s*,\s*/) : [];
    req.get = req.header = (name: string) => {
      const v = req.headers[name.toLowerCase()];
      if (Array.isArray(v)) return v[0];
      return typeof v === "string" ? v : undefined;
    };

    res.status = (code: number) => {
      res.statusCode = code;
      return res;
    };
    res.set = res.header = (field: string, value: string | number | string[]) => {
      res.setHeader(field, value);
      return res;
    };
    res.get = (field: string) => {
      const v = res.getHeader(field);
      if (Array.isArray(v)) return v[0];
      return typeof v === "number" ? String(v) : (v as string | undefined);
    };
    res.type = res.contentType = (t: string) => {
      res.setHeader("Content-Type", t);
      return res;
    };
    res.location = (u: string) => {
      res.setHeader("Location", u);
      return res;
    };
    res.redirect = ((a: number | string, b?: string) => {
      if (typeof a === "number") {
        res.statusCode = a;
        res.setHeader("Location", b!);
      } else {
        res.statusCode = 302;
        res.setHeader("Location", a);
      }
      res.end();
      return res;
    }) as ResponseServer["redirect"];
    res.cookie = (name: string, val: string, opts = {}) => {
      const s = serializeCookie(name, val, opts);
      const prev = res.getHeader("Set-Cookie");
      if (prev) {
        const list = Array.isArray(prev) ? prev.concat(s) : [prev as string, s];
        res.setHeader("Set-Cookie", list);
      } else {
        res.setHeader("Set-Cookie", s);
      }
      return res;
    };
    res.clearCookie = (name: string, opts = {}) => {
      return res.cookie(name, "", { ...opts, expires: new Date(1), maxAge: 0 });
    };
    res.send = (b: any) => {
      if (typeof b === "object") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(b));
      } else {
        res.end(String(b));
      }
      return res;
    };
    res.json = (b: any) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(b));
      return res;
    };

    const [urlPath, qs] = (req.url || "").split("?");
    req.path = urlPath || "/";
    const rawQuery = parseQS(qs || "");
    const safeQuery: Record<string, string> = {};
    for (const k in rawQuery) {
      const v = rawQuery[k];
      safeQuery[k] = Array.isArray(v) ? v[0] : v || "";
    }
    req.query = safeQuery;

    const cookieHeader = (req.headers["cookie"] as string) || "";
    req.cookies = cookieHeader.split(";").reduce<Record<string, string>>((acc, pair) => {
      const [k, ...vals] = pair.trim().split("=");
      if (k) acc[k] = decodeURIComponent(vals.join("="));
      return acc;
    }, {});
    req.params = {};

    const ipRaw = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const ipStr = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw;
    req.ip = ipStr.split(",")[0].trim();

    req.body = {};
    if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
      await new Promise<void>((resolve) => {
        let buf = "";
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
        req.on("error", (err: Error) => {
          logger("error", "Body parse error: " + err.message);
          resolve();
        });
      });
    }

    const errorHandler = (err: any) => {
      logger("error", err.message || err);
      res
        .status(err instanceof HttpError ? err.status : 500)
        .json(
          err instanceof HttpError ? err.payload : { error: err.message || "Internal Server Error" }
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
          await fn({
            request: req,
            response: res,
            req,
            res,
            next: async (err?: any) => await next(err),
          });
          await next();
        }
      };
      await next();
    } catch (err) {
      errorHandler(err);
    }
  }
}
