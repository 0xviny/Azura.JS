/** eslint-disable */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

type Config = {
  server?: any;
  plugins?: Record<string, any>;
  rateLimit?: any;
  cors?: any;
  compression?: any;
};

export class ConfigManager {
  private config: Config = {};
  constructor() {
    const cwd = process.cwd();
    const files = ["azura.config.js", "azura.config.json", "azura.config.yaml"];
    for (const file of files) {
      const full = path.join(cwd, file);
      if (fs.existsSync(full)) {
        Object.assign(this.config, this.loadFile(full));
        break;
      }
    }
  }
  private loadFile(full: string): Config {
    const ext = path.extname(full);
    const content = fs.readFileSync(full, "utf-8");
    if (ext === ".js" || ext === ".json") return require(full);
    if (ext.match(/\.ya?ml$/)) return yaml.load(content) as Config;
    return {};
  }
  get<T extends keyof Config>(key: T): Config[T] | undefined {
    return this.config[key];
  }
  getAll(): Config {
    return this.config;
  }
}
