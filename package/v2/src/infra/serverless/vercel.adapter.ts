import { RequestServer } from "../../shared/types/request.types";
import { ResponseServer } from "../../shared/types/response.types";
import { AzuraServer } from "../server/server";
import { VercelRequest, VercelResponse } from "@vercel/node";

export function vercelAdapter(app: AzuraServer) {
  return async (req: VercelRequest, res: VercelResponse) => {
    await app["handle"](req as RequestServer, res as ResponseServer);
  };
}
