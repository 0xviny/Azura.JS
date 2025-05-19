import { LRU } from "../core/Cache";
import { Plugin } from "../core/PluginLoader";

const cache = new LRU<string, any>(1000);

export const cachePlugin: Plugin = {
  name: "cache",
  register(app) {
    app.onHook("onRequest", (ctx: any, next: Function) => {
      const key = ctx.request.url;
      const cached = cache.get(key);
      if (cached) {
        ctx.response.writeHead(200, { "Content-Type": "application/json" });
        return ctx.response.end(JSON.stringify(cached));
      }
      return next().then(() => {
        cache.set(key, ctx.response.body);
      });
    });
  },
};
