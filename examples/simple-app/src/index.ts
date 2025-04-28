import { Server } from "../../../src/core/Server";
import { HelloController } from "./controllers/HelloController";

async function main() {
  const app = new Server({ port: 3000, cluster: false });

  // Carrega controllers via decorators
  app.load([HelloController]);

  // Inicia
  app.listen();
}

main();
