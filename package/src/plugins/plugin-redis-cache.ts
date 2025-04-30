import { Plugin } from "../core/PluginLoader";
import { createClient } from "redis";

export const redisCachePlugin: Plugin = {
  name: "redis-cache",
  register(app, opts: { url: string; ttl: number }) {
    const client = createClient({ url: opts.url });
    client.connect();
    app.onHook("onRequest", async (ctx: any, next: Function) => {
      const key = `cache:${ctx.request.method}:${ctx.request.url}`;
      const cached = await client.get(key);
      if (cached) {
        ctx.response.writeHead(200, { "Content-Type": "application/json" });
        return ctx.response.end(cached);
      }
      await next();
      if (ctx.response.statusCode === 200) {
        client.setEx(key, opts.ttl, ctx.response.body);
      }
    });
  },
};
