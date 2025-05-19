import { HttpContext } from "../shared/types/http-context.types";

interface CorsOptions {
  origin: string | string[];
  methods: string | string[];
  allowedHeaders: string | string[];
}

export function cors(opts: CorsOptions) {
  const { origin, methods, allowedHeaders } = opts;

  return (ctx: HttpContext, next: () => void) => {
    ctx.response.setHeader(
      "Access-Control-Allow-Origin",
      Array.isArray(origin) ? origin.join(",") : origin
    );

    ctx.response.setHeader(
      "Access-Control-Allow-Methods",
      Array.isArray(methods) ? methods.join(",") : methods
    );
    ctx.response.setHeader(
      "Access-Control-Allow-Headers",
      Array.isArray(allowedHeaders) ? allowedHeaders.join(",") : allowedHeaders
    );

    if (ctx.request.method === "OPTIONS") {
      ctx.response.writeHead(204);
      return ctx.response.end();
    }

    return next();
  };
}
