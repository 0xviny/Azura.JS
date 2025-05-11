import { ServerResponse } from "http";

export interface ResponseServer extends ServerResponse {
  set: (key: string, value: string) => this;
  get: (key: string) => string | number | undefined;
  status: (code: number) => this;
  send: (body: any) => this;
  json: (body: any) => this;
}
