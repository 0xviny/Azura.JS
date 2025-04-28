import { createGzip, createDeflate } from "zlib";
import { Transform } from "stream";

export function compress(threshold = 1024) {
  return async (ctx: any, next: Function) => {
    await next();
    const len = parseInt(ctx.response.getHeader("Content-Length") || "0", 10);
    if (len < threshold) return;
    const encoding = ctx.request.headers["accept-encoding"] || "";
    const stream: Transform = encoding.includes("gzip") ? createGzip() : createDeflate();
    ctx.response.removeHeader("Content-Length");
    ctx.response.setHeader("Content-Encoding", encoding.includes("gzip") ? "gzip" : "deflate");
    ctx.response.write = stream.write.bind(stream);
    ctx.response.end = stream.end.bind(stream);
  };
}
