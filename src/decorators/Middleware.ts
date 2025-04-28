import "reflect-metadata";

export function Middleware(): MethodDecorator {
  return (target, prop) => {
    const mws = Reflect.getMetadata("middlewares", target) || [];
    mws.push(prop as string);
    Reflect.defineMetadata("middlewares", mws, target);
  };
}
