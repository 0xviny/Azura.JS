import { IncomingMessage, ServerResponse } from "http";

export interface HttpContext {
  id: string;
  request: IncomingMessage & { url: string };
  response: ServerResponse;
  params: Record<string, any>;
  query: Record<string, any>;
  body?: any;
  user?: any;
}
