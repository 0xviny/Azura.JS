import { AzuraServer as Server } from "./Server";

export interface Plugin<API = any> {
  name: string;
  register(app: Server, opts?: any): API;
  dependencies?: string[];
}

export class PluginLoader {
  private loaded = new Set<string>();
  constructor(private app: Server) {}

  register<API>(plugin: Plugin<API>, opts?: any): API | undefined {
    if (this.loaded.has(plugin.name)) return;
    plugin.dependencies?.forEach((dep) => {
      if (!this.loaded.has(dep)) this.register(dep as any);
    });
    const api = plugin.register(this.app, opts);
    this.loaded.add(plugin.name);
    return api;
  }
}
