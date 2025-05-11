import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";

export interface RequestServer extends IncomingMessage {
  path: string;
  query: ParsedUrlQuery;
  params: Record<string, string>;
  body: any;
  cookies: Record<string, string>;
  ip: string;
}
