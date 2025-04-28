import { Server } from "../core/Server";
import { VercelRequest, VercelResponse } from "@vercel/node";

export function vercelHandler(app: Server) {
  return async (req: VercelRequest, res: VercelResponse) => {
    await app["handle"](req, res);
  };
}
