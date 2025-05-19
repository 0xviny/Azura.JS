import { createDeflate, createGzip } from "zlib";
import { PassThrough } from "stream";
import { HttpContext } from "../shared/types/http-context.types";

export function compress(threshold: number) {
  return async (ctx: HttpContext, next: () => Promise<void>) => {
    await next();

    const contentLengthHeader = ctx.response.getHeader("Content-Length");
    const contentLength =
      typeof contentLengthHeader === "string"
        ? parseInt(contentLengthHeader, 10)
        : Number(contentLengthHeader || 0);

    if (contentLength < threshold || !ctx.body) return;

    const acceptEncoding = ctx.request.headers["accept-encoding"] ?? "";
    const shouldGzip = acceptEncoding.includes("gzip");
    const compressor = shouldGzip ? createGzip() : createDeflate();

    ctx.response.removeHeader("Content-Length");
    ctx.response.setHeader("Content-Encoding", shouldGzip ? "gzip" : "deflate");

    const passthrough = new PassThrough();
    passthrough.end(ctx.body);

    ctx.response.writeHead(ctx.response.statusCode ?? 200);
    
    // Cast necessário pois ResponseServer sobrescreve `.end()` com retorno encadeável
    passthrough.pipe(compressor).pipe(ctx.response as unknown as NodeJS.WritableStream);
  };
}
