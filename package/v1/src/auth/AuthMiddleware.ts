import { JWTManager } from "./JWTManager";
import { APIKeyManager } from "./APIKeyManager";
import { HTTPError } from "../core/Utils";

const jwt = new JWTManager();

export function authMiddleware(ctx: any, next: Function) {
  const auth = ctx.request.headers["authorization"]?.split(" ")[1];
  const apiKey = ctx.request.headers["x-api-key"];
  if (auth) {
    const payload = jwt.verify(auth);
    ctx.user = payload;
  } else if (apiKey) {
    APIKeyManager.check(apiKey);
    ctx.user = { apiKey };
  } else {
    throw new HTTPError(401, { message: "Não autenticado" });
  }
  return next();
}
