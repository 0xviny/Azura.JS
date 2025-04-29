import http, { IncomingMessage, ServerResponse } from "http";
import cluster from "cluster";
import os from "os";
import { Router } from "./Router";
import { Lifecycle } from "./Lifecycle";
import { PluginLoader, Plugin } from "./PluginLoader";
import { uuid, HTTPError, logger } from "./Utils";
import { applyDecorators } from "../decorators/Decorators";
import { parse } from "querystring";
import { DBAdapter } from "../db/Database";

export interface ServerOptions {
  port?: number;
  https?: boolean;
  http2?: boolean;
  cluster?: boolean;
}

type Handler = (ctx: any) => Promise<void> | void;
export type RequestHandler = (
  req: IncomingMessage & any,
  res: ServerResponse & any
) => Promise<void>;

function adaptRequestHandler(handler: RequestHandler): Handler {
  return async (ctx: any) => {
    const { request, response } = ctx;
    await handler(request, response);
  };
}

export class AzuraServer {
  public router = new Router();
  public db?: DBAdapter;
  private life = new Lifecycle();
  private plugins = new PluginLoader(this);
  private server?: http.Server;
  private middlewares: Array<(req: any, res: any, next: (err?: any) => void) => void> = [];

  constructor(private opts: ServerOptions) {
    if (this.opts.cluster && cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) cluster.fork();
      cluster.on("exit", () => cluster.fork());
      return;
    }

    this.server = http.createServer();
    this.server.on("request", this.handle.bind(this));
  }

  public load(controllers: any[]): void {
    applyDecorators(this, controllers);
  }

  public use(middleware: (req: any, res: any, next: (err?: any) => void) => void) {
    this.middlewares.push(middleware);
  }

  public onUpgrade(fn: (req: any, socket: any, head: any) => void) {
    this.server?.on("upgrade", fn);
  }

  decorate(name: string, value: any): void {
    (this as any)[name] = value;
  }

  registerPlugin(plugin: Plugin, opts?: any) {
    this.plugins.register(plugin, opts);
  }

  addRoute(method: string, path: string, handler: RequestHandler) {
    this.router.add(method, path, adaptRequestHandler(handler));
  }

  onHook(type: any, fn: Function) {
    this.life.add(type, fn);
  }

  public get(path: string, handler: RequestHandler): void {
    this.addRoute("GET", path, handler);
  }

  public post(path: string, handler: RequestHandler): void {
    this.addRoute("POST", path, handler);
  }

  public put(path: string, handler: RequestHandler): void {
    this.addRoute("PUT", path, handler);
  }

  public delete(path: string, handler: RequestHandler): void {
    this.addRoute("DELETE", path, handler);
  }

  listen(port = this.opts.port || 3000) {
    if (!cluster.isPrimary) {
      this.server?.listen(port, () => logger("info", `Worker listening on ${port}`));
    } else {
      this.server?.listen(port, () => logger("info", `Master listening on ${port}`));
    }
  }

  private async handle(req: any, res: any) {
    const id = uuid();

    res.set = (key: string, value: string) => res.setHeader(key, value);
    res.get = (key: string) => res.getHeader(key);
    res.send = (body: any) => {
      if (typeof body === "object") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end(body);
      }
    };
    res.json = (body: any) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    };
    res.status = (code: number) => {
      res.statusCode = code;
      return res;
    };

    const [path, queryString] = req.url?.split("?") || [];
    req.query = parse(queryString || "");
    req.cookies = parseCookie(req.headers.cookie || "");
    req.params = {};
    req.ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
      .split(",")[0]
      .trim();
    req.body = {};

    if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
      await new Promise<void>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: any) => (data += chunk));
        req.on("end", () => {
          try {
            if (req.headers["content-type"]?.includes("application/json")) {
              req.body = JSON.parse(data || "{}");
            } else if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
              req.body = parse(data || "");
            }
            resolve();
          } catch {
            req.body = {};
            resolve();
          }
        });
        req.on("error", reject);
      });
    }

    const errorMiddleware = (err: any, req: any, res: any) => {
      logger("error", err.message || err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    };

    try {
      const { handler, params } = this.router.find(req.method || "GET", path || "/");
      req.params = params;

      const executeMiddlewares = (index: number) => {
        if (index >= this.middlewares.length) return handler(req, res);
        const middleware = this.middlewares[index];
        middleware(req, res, (err?: any) => {
          if (err) return errorMiddleware(err, req, res);
          executeMiddlewares(index + 1);
        });
      };

      await executeMiddlewares(0);
    } catch (err: any) {
      if (err instanceof HTTPError) {
        res.status(err.status).json(err.payload);
      } else {
        errorMiddleware(err, req, res);
      }
    }
  }
}

function parseQuery(str: string) {
  return parse(str);
}

function parseCookie(cookieStr: string) {
  const cookies: Record<string, string> = {};
  cookieStr.split(";").forEach((pair) => {
    const [key, ...v] = pair.trim().split("=");
    cookies[key] = decodeURIComponent(v.join("="));
  });
  return cookies;
}
