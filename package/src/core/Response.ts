import { ServerResponse } from "http";

export interface Response extends ServerResponse {
  send: (body: any) => void;
  json: (body: any) => void;
  status: (code: number) => Response;
}
