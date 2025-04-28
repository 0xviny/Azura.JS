import "reflect-metadata";
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
export interface RouteDef {
  method: Method;
  path: string;
  property: string;
}

export function Route(method: Method, path: string): MethodDecorator {
  return (target, prop) => {
    const routes: RouteDef[] = Reflect.getMetadata("routes", target) || [];
    routes.push({ method, path, property: prop as string });
    Reflect.defineMetadata("routes", routes, target);
  };
}

export const Get = (p: string) => Route("GET", p);
export const Post = (p: string) => Route("POST", p);
export const Put = (p: string) => Route("PUT", p);
export const Delete = (p: string) => Route("DELETE", p);
export const Options = (p: string) => Route("OPTIONS", p);
