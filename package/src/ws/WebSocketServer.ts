import { WebSocketServer as WSS } from "ws";

export function createWSS(server: any) {
  const wss = new WSS({ server });
  wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      // pub/sub ou roteamento de mensagens
      console.log("WS message:", msg.toString());
    });
  });
  return wss;
}
