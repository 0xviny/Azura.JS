import { RequestServer } from "./request.types";
import { ResponseServer } from "./response.types";

export interface HttpContext {
  request: RequestServer;
  response: ResponseServer;
  body?: Buffer | string;
}
