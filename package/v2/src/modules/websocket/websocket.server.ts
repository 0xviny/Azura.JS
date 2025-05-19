import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";

export function createWebSocket(server: HTTPServer): WebSocketServer {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket: WebSocket, req) => {
    socket.on("message", (data: RawData) => {
      const message = data.toString();
      console.log("received: %s", message);
    });

    socket.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });

  return wss;
}
