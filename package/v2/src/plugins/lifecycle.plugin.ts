import { HttpContext } from "../shared/types/http-context.types";
import { HttpError } from "../shared/utils/http.utils";

export type HookType =
  | "onRequest"
  | "preParsing"
  | "preValidation"
  | "preHandler"
  | "onResponse"
  | "onError";

export class Lifecycle {
  private hooks: Record<HookType, ((ctx: HttpContext) => unknown | Promise<unknown>)[]> = {
    onRequest: [],
    preParsing: [],
    preValidation: [],
    preHandler: [],
    onResponse: [],
    onError: [],
  };

  add(type: HookType, fn: (ctx: HttpContext) => unknown | Promise<unknown>) {
    this.hooks[type].push(fn);
  }

  async run(type: HookType, ctx: HttpContext): Promise<void> {
    for (const fn of this.hooks[type]) {
      try {
        await fn(ctx);
      } catch (e) {
        const error = e instanceof Error ? e : new Error("Unknown error");
        throw new HttpError(400, { message: error.message });
      }
    }
  }
}
