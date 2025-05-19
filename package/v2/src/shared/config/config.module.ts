import { existsSync, readFileSync } from "fs";
import path from "path";
import { load } from "js-yaml";
import { pathToFileURL } from "url";
import { HttpError } from "../utils/http.utils";

export type Config = {
  server?: {
    port?: number;
    cluster?: boolean;
    https?: boolean;
  };
  plugins?: {
    rateLimit?: {
      enabled?: boolean;
      limit?: number;
      timeframe?: number;
    };
    cors?: {
      enabled?: boolean;
      origin?: string;
    };
    compression?: {
      enabled?: boolean;
      level?: number;
    };
  };
};

type SupportedExtension = ".js" | ".ts" | ".json" | ".yaml" | ".yml";

export class ConfigModule {
  private config: Config = {};

  /**
   * Carrega o primeiro azura.config.* válido SINTONAMENTE.
   * Lança Error se nenhum for encontrado ou em caso de parsing.
   */
  initSync(): void {
    const cwd = process.cwd();
    const files = [
      "azura.config.ts",
      "azura.config.js",
      "azura.config.json",
      "azura.config.yaml",
      "azura.config.yml",
    ];

    let loaded = false;
    for (const fname of files) {
      const full = path.join(cwd, fname);
      if (!existsSync(full)) continue;

      const ext = path.extname(full) as SupportedExtension;
      const raw = readFileSync(full, "utf-8");

      try {
        let parsed: any;
        switch (ext) {
          case ".json":
            parsed = JSON.parse(raw);
            break;
          case ".yaml":
          case ".yml":
            parsed = load(raw);
            break;
          case ".js":
          case ".ts":
            // em Bun/Node+ts-node isso funciona direto
            // ou configure seu loader de TS
            // para .ts. Em Bun você não precisa de ts-node.
            // Use require para carregar sincronicamente.
            // Atenção: require resolves .js/.ts conforme seu runtime.
            // Em caso de erro aqui, vai pro catch abaixo.
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const mod = require(full);
            parsed = mod.default || mod;
            break;
          default:
            throw new Error(`Extensão não suportada: ${ext}`);
        }
        this.config = { ...this.config, ...(parsed as Config) };
        loaded = true;
        break;
      } catch (e: any) {
        throw new Error(`Erro ao carregar ${fname}: ${e.message}`);
      }
    }

    if (!loaded) {
      throw new Error(
        "Nenhum arquivo de configuração (azura.config.{ts|js|json|yaml|yml}) foi encontrado."
      );
    }
  }

  getAll(): Config {
    return this.config;
  }

  get<T extends keyof Config>(key: T): Config[T] | undefined {
    return this.config[key];
  }
}
