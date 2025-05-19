import { createReadStream } from "fs";
import { extname } from "path";
const mime: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

export function serveStatic(root: string) {
  return (ctx: any) => {
    const full = `${root}${ctx.request.url}`;
    const type = mime[extname(full)] || "application/octet-stream";
    ctx.response.writeHead(200, { "Content-Type": type });
    createReadStream(full).pipe(ctx.response);
  };
}
