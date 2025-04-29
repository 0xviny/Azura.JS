import { dbPlugin } from "../../../src";
import { Request } from "../../../src/core/Request";
import { Response } from "../../../src/core/Response";
import { AzuraServer } from "../../../src/core/Server";
import { HelloController } from "./controllers/HelloController";

async function main() {
  const app = new AzuraServer({ port: 3000, cluster: false });

  // Registra plugin de banco de dados
  app.registerPlugin(dbPlugin, {
    tpye: "json",
    file: "./db.json",
  });

  // Exemplo de uso de plugin
  app.get("/users", async (req: Request, res: Response) => {
    const users = await app.db?.find("users", {});
    res.json(users);
  })

  // Carrega controllers via decorators
  app.load([HelloController]);

  // Inicia
  app.listen();
}

main();
