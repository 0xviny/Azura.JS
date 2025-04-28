import { Server } from "./Server";

export interface Plugin {
  name: string;
  register: (app: Server, opts?: any) => void;
  dependencies?: string[];
}

export class PluginLoader {
  private loaded = new Set<string>();
  constructor(private app: Server) {}

  register(plugin: Plugin, opts?: any) {
    if (this.loaded.has(plugin.name)) return;
    /* plugin.dependencies?.forEach((dep) => {
      if (!this.loaded.has(dep)) this.register(dep);
    }); */
    plugin.register(this.app, opts);
    this.loaded.add(plugin.name);
  }
}
