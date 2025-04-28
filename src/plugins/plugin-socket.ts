import { Plugin } from "../core/PluginLoader";
import { WebSocketServer } from "ws";

export const wsPlugin: Plugin = {
  name: "ws",
  register(app) {
    app.onUpgrade((req: any, socket: any, head: any) => {
      if (!(app as any)._wss) {
        (app as any)._wss = new WebSocketServer({ noServer: true });
        (app as any)._wss.on("connection", (ws: any) => {
          ws.on("message", (msg: any) => console.log("WS message:", msg.toString()));
        });
      }
      (app as any)._wss.handleUpgrade(req, socket, head, (ws: any) => {
        (app as any)._wss.emit("connection", ws, req);
      });
    });
  },
};
