import "reflect-metadata";
import { ParamDefinition, ParamSource, RouteDefinition } from "../types/routes.types";
import { AzuraServer } from "../../infra/server/server";
import { RequestServer } from "../types/request.types";
import { ResponseServer } from "../types/response.types";

const PREFIX_KEY = Symbol("prefix");
const ROUTES_KEY = Symbol("routes");
const PARAMS_KEY = Symbol("params");

export function Controller(prefix = ""): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(PREFIX_KEY, prefix, target);
  };
}

function createMethodDecorator(method: string) {
  return (path = ""): MethodDecorator => {
    return (target, propertyKey) => {
      const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, target) || [];
      routes.push({
        method,
        path,
        propertyKey: propertyKey as string,
        params: Reflect.getMetadata(PARAMS_KEY, target, propertyKey as string) || [],
      });
      Reflect.defineMetadata(ROUTES_KEY, routes, target);
    };
  };
}

function createParamDecorator(type: ParamSource) {
  return (name?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const existing: ParamDefinition[] =
        Reflect.getMetadata(PARAMS_KEY, target, propertyKey as string) || [];
      existing.push({ index: parameterIndex, type, name });
      Reflect.defineMetadata(PARAMS_KEY, existing, target, propertyKey as string);
    };
  };
}

// Métodos HTTP
export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");
export const Patch = createMethodDecorator("PATCH");

// Parâmetros
export const Req = createParamDecorator("req");
export const Res = createParamDecorator("res");
export const Next = createParamDecorator("next");
export const Param = createParamDecorator("param");
export const Query = createParamDecorator("query");
export const Body = createParamDecorator("body");
export const Headers = createParamDecorator("headers");
export const Ip = createParamDecorator("ip");
export const UserAgent = createParamDecorator("useragent");

/**
 * Aplica os decorators aos controllers:
 * - lê prefix, rotas e params
 * - cria um RequestHandler que extrai os args e invoca o método
 */
export function applyDecorators(app: AzuraServer, controllers: any[]) {
  controllers.forEach((ControllerClass) => {
    const prefix = Reflect.getMetadata(PREFIX_KEY, ControllerClass) || "";
    const instance = new ControllerClass();

    const routes: RouteDefinition[] =
      Reflect.getMetadata(ROUTES_KEY, ControllerClass.prototype) || [];

    routes.forEach((r) => {
      // gera o handler que o AzuraServer espera: (req,res,next)
      const handler = async (
        req: RequestServer | any,
        res: ResponseServer | any,
        next: (err?: any) => void
      ) => {
        try {
          // ordena params por índice e extrai valores
          const args = r.params
            .sort((a, b) => a.index - b.index)
            .map((p) => {
              switch (p.type) {
                case "req":
                  return req;
                case "res":
                  return res;
                case "next":
                  return next;
                case "param":
                  return p.name ? req.params[p.name] : req.params;
                case "query":
                  return p.name ? req.query[p.name] : req.query;
                case "body":
                  return p.name ? req.body[p.name] : req.body;
                case "headers":
                  return p.name ? req.headers[p.name.toLowerCase()] : req.headers;
                case "ip":
                  return req.ip;
                case "useragent":
                  return req.headers["user-agent"];
                default:
                  return undefined;
              }
            });
          // chama o método do controller
          const result = (instance as any)[r.propertyKey](...args);
          // se retornar Promise e não chamou res.* por conta própria, aguarda
          if (result instanceof Promise) await result;
        } catch (err) {
          next(err);
        }
      };

      app.addRoute(r.method, prefix + r.path, handler);
    });
  });
}
