import { spawn } from "child_process";
import chokidar from "chokidar";

export function serve() {
  let server: any;
  function start() {
    if (server) server.kill();
    server = spawn("ts-node", ["src/index.ts"], { stdio: "inherit" });
  }
  chokidar.watch("src").on("change", start);
  start();
}
