export function cors(opts: { origin: string | string[]; methods: string[]; headers: string[] }) {
  const { origin, methods, headers } = opts;
  return (ctx: any, next: Function) => {
    ctx.response.setHeader(
      "Access-Control-Allow-Origin",
      Array.isArray(origin) ? origin.join(",") : origin
    );
    ctx.response.setHeader("Access-Control-Allow-Methods", methods.join(","));
    ctx.response.setHeader("Access-Control-Allow-Headers", headers.join(","));
    if (ctx.request.method === "OPTIONS") {
      ctx.response.writeHead(204);
      return ctx.response.end();
    }
    return next();
  };
}
