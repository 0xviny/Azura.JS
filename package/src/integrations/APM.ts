import { Plugin } from "../core/PluginLoader";
import { performance } from "perf_hooks";

export const apmPlugin: Plugin = {
  name: "apm",
  register(app) {
    // guarda métricas por rota
    const metrics: Record<string, { count: number; totalTime: number }> = {};

    app.onHook("preHandler", async (ctx: any, next: Function) => {
      const key = `${ctx.request.method} ${ctx.request.url}`;
      const start = performance.now();
      await next();
      const duration = performance.now() - start;
      if (!metrics[key]) metrics[key] = { count: 0, totalTime: 0 };
      metrics[key].count++;
      metrics[key].totalTime += duration;
    });

    // expõe métricas APM
    app.addRoute("GET", "/__apm", async (ctx: any) => {
      ctx.response.writeHead(200, { "Content-Type": "application/json" });
      const out: any = {};
      for (const k in metrics) {
        out[k] = {
          count: metrics[k].count,
          avgMs: (metrics[k].totalTime / metrics[k].count).toFixed(2),
        };
      }
      ctx.response.end(JSON.stringify(out, null, 2));
    });
  },
};
