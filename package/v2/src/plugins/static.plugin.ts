import { createReadStream } from "fs";
import { extname } from "path";
import { HttpContext } from "../shared/types/http-context.types";

const mime: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

export function serveStatic(root: string) {
  return (ctx: HttpContext) => {
    const full = `${root}${ctx.request.url}`;
    const type = mime[extname(full)] || "application/octet-stream";

    ctx.response.writeHead(200, { "Content-Type": type });
    createReadStream(full).pipe(ctx.response as unknown as NodeJS.WritableStream);
  };
}
