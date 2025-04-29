import "reflect-metadata";
import { ChatController } from "./controllers/ChatController";
import { AzuraServer } from "../../../src/core/Server";
import { wsPlugin } from "../../../src/plugins/plugin-socket";

const app = new AzuraServer({ port: 4000 });

app.registerPlugin(wsPlugin);
app.load([ChatController]);
app.listen();
