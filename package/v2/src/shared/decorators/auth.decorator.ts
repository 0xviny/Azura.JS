import "reflect-metadata";

export function Auth(role?: string): MethodDecorator {
    return (target, prop) => {
        const auth = Reflect.getMetadata("auth", target) || [];

        auth.push({ property: prop as string,  role });
        Reflect.defineMetadata("auth", auth, target);
    };
}

export function Roles(...roles: string[]): ClassDecorator {
    return (target) => Reflect.defineMetadata("roles", roles, target);
}

export function Public(): MethodDecorator {
    return (target, prop) => {
        const auth = Reflect.getMetadata("public", target) || [];

        auth.push({ property: prop as string });
        Reflect.defineMetadata("public", auth, target);
    };
}