import "reflect-metadata";

export function Auth(role?: string): MethodDecorator {
  return (target, prop) => {
    const auths = Reflect.getMetadata("auth", target) || [];
    auths.push({ property: prop as string, role });
    Reflect.defineMetadata("auth", auths, target);
  };
}

export function Roles(...roles: string[]): ClassDecorator {
  return (target) => Reflect.defineMetadata("roles", roles, target);
}

export function Public(): MethodDecorator {
  return (target, prop) => {
    const pubs = Reflect.getMetadata("public", target) || [];
    pubs.push(prop as string);
    Reflect.defineMetadata("public", pubs, target);
  };
}
