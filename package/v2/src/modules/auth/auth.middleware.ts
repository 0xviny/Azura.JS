import { JwtManager } from "./auth.service";
import { HttpError } from "../../shared/utils/http.utils";
import { KeyManager } from "../api-keys/api-key.manager";

export interface BaseContext {
  request: {
    headers: Record<string, string | undefined>;
  };
  user?: unknown;
  [key: string]: any;
}

const jwt = new JwtManager();

export function authMiddleware<T extends BaseContext>(ctx: T, next: () => void): void {
  const auth = ctx.request.headers["authorization"]?.split(" ")[1];
  const apiKey = ctx.request.headers["x-api-key"];

  if (auth) {
    const payload = jwt.verify(auth);
    ctx.user = payload;
  } else if (apiKey) {
    const key = new KeyManager(apiKey);

    key.check(apiKey);
    ctx.user = { apiKey };
  } else {
    throw new HttpError(401, { message: "Não autenticado" });
  }

  return next();
}
