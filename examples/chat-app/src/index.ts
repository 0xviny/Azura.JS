import "reflect-metadata";
import { ChatController } from "./controllers/ChatController";
import { Server } from "../../../src/core/Server";
import { wsPlugin } from "../../../src/plugins/plugin-socket";

const app = new Server({ port: 4000 });

app.registerPlugin(wsPlugin);
app.load([ChatController]);
app.listen();
