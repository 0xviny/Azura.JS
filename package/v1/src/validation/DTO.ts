import "reflect-metadata";

export function DTO(schema: any): ParameterDecorator {
  return (target, prop, index) => {
    const existing = Reflect.getMetadata("dtos", target, prop as string) || [];
    existing.push({ index, schema });
    Reflect.defineMetadata("dtos", existing, target, prop as string);
  };
}
