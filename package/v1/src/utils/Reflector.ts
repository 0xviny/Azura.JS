import "reflect-metadata";

export function getMetadata(target: any, key: string) {
  return Reflect.getMetadata(key, target) || [];
}
