interface Entry {
  count: number;
  ts: number;
}
const WINDOW = 60 * 1000;
const LIMIT = 100;
const store = new Map<string, Entry>();

export function rateLimit() {
  return (ctx: any, next: Function) => {
    const ip = ctx.request.socket.remoteAddress!;
    const now = Date.now();
    const entry = store.get(ip) || { count: 0, ts: now };
    if (now - entry.ts > WINDOW) {
      entry.count = 1;
      entry.ts = now;
    } else {
      entry.count++;
    }
    store.set(ip, entry);
    if (entry.count > LIMIT) {
      ctx.response.writeHead(429);
      return ctx.response.end("Too Many Requests");
    }
    return next();
  };
}
