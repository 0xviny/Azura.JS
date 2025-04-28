import { HTTPError } from "../core/Utils";

const keys = new Set<string>([process.env.API_KEY_1!, process.env.API_KEY_2!]);

export class APIKeyManager {
  static check(key?: string) {
    if (!key || !keys.has(key)) {
      throw new HTTPError(401, { message: "API Key inválida" });
    }
  }
}
