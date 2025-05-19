import { ResponseServer } from "../shared/types/response.types";

export function health() {
  return (res: ResponseServer) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
  };
}
