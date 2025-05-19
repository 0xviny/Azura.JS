import { Controller } from "../../../../src/decorators/Controller";
import { Socket } from "../../../../src/decorators/Socket";

@Controller("/chat")
export class ChatController {
  @Socket("/message")
  onMessage(ws: any, msg: any) {
    ws.server.clients.forEach((client: any) => client.send(msg));
  }
}
