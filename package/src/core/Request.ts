import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";

export interface Request extends IncomingMessage {
  query: ParsedUrlQuery;
  params: Record<string, string>;
  body?: any;
}
