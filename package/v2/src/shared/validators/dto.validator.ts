import "reflect-metadata";

export function validateDto(dto: any): ParameterDecorator {
  return (target, prop, index) => {
    const existing = Reflect.getMetadata("dtos", target, prop as string) || [];

    existing.push({ index, dto });
    Reflect.defineMetadata("dtos", existing, target, prop as string);
  };
}
