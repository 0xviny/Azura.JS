import { rateLimit } from "../core/RateLimit";
import { Plugin } from "../core/PluginLoader";

export const rateLimitPlugin: Plugin = {
  name: "rate-limit",
  register(app) {
    app.onHook("onRequest", rateLimit());
  },
};
