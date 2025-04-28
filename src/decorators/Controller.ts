import "reflect-metadata";

export function Controller(prefix: string): ClassDecorator {
  return (target) => Reflect.defineMetadata("prefix", prefix, target);
}
