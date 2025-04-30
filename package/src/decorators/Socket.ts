import "reflect-metadata";

export function Socket(path: string): MethodDecorator {
  return (target, prop) => {
    const sockets = Reflect.getMetadata("sockets", target) || [];
    sockets.push({ path, property: prop as string });
    Reflect.defineMetadata("sockets", sockets, target);
  };
}
