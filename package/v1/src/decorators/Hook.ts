import "reflect-metadata";
import { HookType } from "../core/Lifecycle";

export function Hook(type: HookType): MethodDecorator {
  return (target, prop) => {
    const hooks = Reflect.getMetadata("hooks", target) || [];
    hooks.push({ type, property: prop as string });
    Reflect.defineMetadata("hooks", hooks, target);
  };
}
