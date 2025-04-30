import { AzuraServer, dbPlugin } from "../../../src";
import { Request } from "../../../src/core/Request";
import { Response } from "../../../src/core/Response";
import { HelloController } from "./controllers/HelloController";

// 1) Interface que define a API do seu plugin de auth
interface AuthAPI {
  requireAuth(): (req: Request, res: Response, next: Function) => void;
}

// 2) Definição do plugin, retornando um AuthAPI
const authPlugin = {
  name: "auth",
  register(app: AzuraServer): AuthAPI {
    const api: AuthAPI = {
      requireAuth: () => (req, res, next) => {
        if (!req.headers.authorization) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        next();
      },
    };
    return api;
  },
};

const app = new AzuraServer({ port: 3000, cluster: false });

// 3) Registrar plugin de banco de dados
app.registerPlugin(dbPlugin, {
  type: "json",
  file: "./db.json",
});

// já expõe app.db
app.db!.connect();

// 4) Registrar plugin de auth e capturar a API tipada
const auth = app.registerPlugin<AuthAPI>(authPlugin)!;

// 5) Rota sem auth
app.get("/users", async (req: Request, res: Response) => {
  const users = await app.db!.find("users", {});
  return res.json(users);
});

// 6) Rota protegida: passa o middleware do auth antes do handler
app.get("/protected", auth.requireAuth(), async (req: Request, res: Response) => {
  return res.json({ message: "Protected route" });
});

// 7) Carregar controllers via decorators (se tiver)
app.load([HelloController]);

// 8) Iniciar
app.listen();

// Exportar app para utilizar a class em outros arquivos
export { app };
// module.exports = app;
