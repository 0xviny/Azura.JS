import { AzuraServer } from "../core/Server";
import { VercelRequest, VercelResponse } from "@vercel/node";

export function vercelHandler(app: AzuraServer) {
  return async (req: VercelRequest, res: VercelResponse) => {
    await app["handle"](req, res);
  };
}
