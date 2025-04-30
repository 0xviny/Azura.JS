import { compress } from "../core/Compression";
import { Plugin } from "../core/PluginLoader";

export const compressionPlugin: Plugin = {
  name: "compression",
  register(app, opts) {
    app.onHook("preHandler", compress(opts.threshold));
  },
};
