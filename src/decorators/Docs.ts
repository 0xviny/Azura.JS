import "reflect-metadata";

export function OpenAPI(info: any): ClassDecorator {
  return (target) => Reflect.defineMetadata("openapi", info, target);
}

export function Schema(schema: any): MethodDecorator {
  return (target, prop) => {
    const schemas = Reflect.getMetadata("schemas", target) || [];
    schemas.push({ property: prop as string, schema });
    Reflect.defineMetadata("schemas", schemas, target);
  };
}
