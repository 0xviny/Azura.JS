// src/decorators/Decorators.ts
import "reflect-metadata";
import { AzuraServer } from "../core/Server";
import { RouteDefinition } from "../types/RouteDefinition";
import { HookType } from "../core/Lifecycle";

type HookDef = { type: HookType; property: string };
type SocketDef = { path: string; property: string };

export function applyDecorators(app: AzuraServer, controllers: any[]): void {
  controllers.forEach((ControllerClass) => {
    const prefix: string = Reflect.getMetadata("prefix", ControllerClass) || "";
    const instance = new ControllerClass();

    // Rotas (GET, POST, etc)
    const routes: RouteDefinition[] =
      Reflect.getMetadata("routes", ControllerClass.prototype) || [];
    routes.forEach((r) => {
      const fullPath = prefix + r.path;
      app.addRoute(r.method, fullPath, async (ctx: any) => {
        // injete params de URL aqui se precisar
        await (instance as any)[r.property](ctx);
      });
    });

    // Hooks (onRequest, preHandler, ...)
    const hooks: HookDef[] = Reflect.getMetadata("hooks", ControllerClass.prototype) || [];
    hooks.forEach((h) => {
      app.onHook(h.type, (ctx: any, next: Function) => (instance as any)[h.property](ctx, next));
    });

    // Middlewares específicos de Controller (decorator @Middleware)
    const middlewares: string[] =
      Reflect.getMetadata("middlewares", ControllerClass.prototype) || [];
    middlewares.forEach((prop) => {
      // assumindo que middleware registra via onRequest
      app.onHook("onRequest", (ctx: any, next: Function) => (instance as any)[prop](ctx, next));
    });

    // WebSockets (@Socket)
    const sockets: SocketDef[] = Reflect.getMetadata("sockets", ControllerClass.prototype) || [];
    sockets.forEach((s) => {
      const path = prefix + s.path;
      // Supondo que você já tenha criado o WSS via createWSS
      app.onHook("onRequest", (ctx: any, next: Function) => {
        // passe para um canal WS, aqui apenas exemplo:
        if (ctx.request.url === path) {
          (instance as any)[s.property](ctx);
        }
        return next();
      });
    });

    // Decorators adicionais (Auth, Schema, etc) podem ser processados aqui
    // Exemplo para @Auth:
    const auths: { property: string; role?: string }[] =
      Reflect.getMetadata("auth", ControllerClass.prototype) || [];
    auths.forEach((a) => {
      app.onHook("preValidation", (ctx: any, next: Function) =>
        (instance as any)[a.property](ctx, next)
      );
    });
  });
}
