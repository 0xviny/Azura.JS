import { randomUUID } from "crypto";

export function uuid(): string {
  return randomUUID();
}

export class HTTPError extends Error {
  constructor(public status: number, public payload: any) {
    super(payload.message || payload);
    this.name = "HTTPError";
  }
}

export function logger(level: "info" | "warn" | "error", msg: string): void {
  const id = uuid();
  console[level](`[Azura] [${id}] [${new Date().toISOString()}] ${msg}`);
}
