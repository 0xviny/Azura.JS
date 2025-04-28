import { HTTPError } from "./Utils";

export type HookType =
  | "onRequest"
  | "preParsing"
  | "preValidation"
  | "preHandler"
  | "onResponse"
  | "onError";

export class Lifecycle {
  private hooks: Record<HookType, Function[]> = {
    onRequest: [],
    preParsing: [],
    preValidation: [],
    preHandler: [],
    onResponse: [],
    onError: [],
  };

  add(type: HookType, fn: Function) {
    this.hooks[type].push(fn);
  }

  async run(type: HookType, ctx: any): Promise<void> {
    for (const fn of this.hooks[type]) {
      try {
        await fn(ctx);
      } catch (e: any) {
        throw new HTTPError(400, { message: e.message });
      }
    }
  }
}
