import { Server } from "../core/Server";

export interface Plugin {
  name: string;
  register(app: Server, opts?: any): void;
  dependencies?: string[];
}
