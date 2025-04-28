import { cors } from "../core/Cors";
import { Plugin } from "../core/PluginLoader";

export const corsPlugin: Plugin = {
  name: "cors",
  register(app, opts) {
    app.onHook("onRequest", cors(opts));
  },
};
