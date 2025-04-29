import http, { IncomingMessage, ServerResponse } from "http";
import cluster from "cluster";
import os from "os";
import { Router } from "./Router";
import { Lifecycle } from "./Lifecycle";
import { PluginLoader, Plugin } from "./PluginLoader";
import { uuid, HTTPError, logger } from "./Utils";
import { applyDecorators } from "../decorators/Decorators";

export interface ServerOptions {
  port?: number;
  https?: boolean;
  http2?: boolean;
  cluster?: boolean;
}

type Handler = (ctx: any) => Promise<void> | void;
export type RequestHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

function adaptRequestHandler(handler: RequestHandler): Handler {
  return async (ctx: any) => {
    const { request, response } = ctx;
    await handler(request, response);
  };
}

export class Server {
  public router = new Router();
  private life = new Lifecycle();
  private plugins = new PluginLoader(this);
  private server?: http.Server;

  constructor(private opts: ServerOptions) {
    if (this.opts.cluster && cluster.isMaster) {
      for (let i = 0; i < os.cpus().length; i++) cluster.fork();
      cluster.on("exit", () => cluster.fork());
      return;
    }

    this.server = http.createServer();
    this.server.on("request", this.handle.bind(this));
  }

  // Método para carregar controladores
  public load(controllers: any[]): void {
    applyDecorators(this, controllers);
  }

  public onUpgrade(fn: (req: any, socket: any, head: any) => void) {
    this.server?.on("upgrade", fn);
  }

  decorate(name: string, value: any): void {
    // @ts-ignore
    this[name] = value;
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
    if (!cluster.isMaster) {
      this.server?.listen(port, () => logger("info", `Worker listening on ${port}`));
    } else {
      this.server?.listen(port, () => logger("info", `Master listening on ${port}`));
    }
  }

  private async handle(req: IncomingMessage, res: ServerResponse) {
    const id = uuid();
    const ctx: any = {
      id,
      request: req,
      response: res,
      params: {},
      query: Object.fromEntries(new URLSearchParams(req.url?.split("?")[1] || "")),
    };
    try {
      const handler = this.router.find(req.method!, req.url?.split("?")[0] || "");
      await handler(ctx);
    } catch (e: any) {
      if (e instanceof HTTPError) {
        res.writeHead(e.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(e.payload));
      } else {
        logger("error", e.message);
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    }
  }
}
