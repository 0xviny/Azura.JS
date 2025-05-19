import { HttpError } from "../../shared/utils/http.utils";

export class KeyManager {
  public keys: Set<string>;

  constructor(keys: string | string[]) {
    this.keys = new Set<string>(keys);
  }

  public check(key?: string): void {
    if (!key || !this.keys.has(key)) {
      throw new HttpError(401, { message: "A Key enviada não é válida!" });
    }
  }
}
