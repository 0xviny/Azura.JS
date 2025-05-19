import { AzuraServer } from "../../infra/server/server";

export interface Plugin<API = unknown, Options = unknown> {
  name: string;
  register(app: AzuraServer, opts: Options): API;
  dependencies?: string[];
}

export type PluginMap = Record<string, Plugin<any, any>>;
