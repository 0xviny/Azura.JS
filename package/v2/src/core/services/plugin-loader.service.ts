import { AzuraServer } from "../../infra/server/server";
import { PluginMap } from "../../shared/types/plugin.types";

export class PluginLoader<Plugins extends PluginMap> {
  private loadedPlugins = new Set<string>();
  private apis: Partial<{ [K in keyof Plugins]: ReturnType<Plugins[K]["register"]> }> = {};

  constructor(private app: AzuraServer, private plugins: Plugins) {}

  register<K extends keyof Plugins>(
    name: K,
    plugin: Plugins[K],
    options: Parameters<Plugins[K]["register"]>[1]
  ): ReturnType<Plugins[K]["register"]> {
    if (this.loadedPlugins.has(plugin.name)) return this.apis[name]!;

    plugin.dependencies?.forEach((depName) => {
      const dep = this.plugins[depName];
      if (!dep) throw new Error(`Plugin dependency "${depName}" not found.`);
      this.register(depName as keyof Plugins, dep as Plugins[keyof Plugins], {} as any);
    });

    const api = plugin.register(this.app, options);
    this.apis[name] = api;
    this.loadedPlugins.add(plugin.name);
    return api;
  }

  get<K extends keyof Plugins>(name: K): ReturnType<Plugins[K]["register"]> {
    const api = this.apis[name];
    if (!api) throw new Error(`Plugin "${String(name)}" is not registered.`);
    return api;
  }
}
