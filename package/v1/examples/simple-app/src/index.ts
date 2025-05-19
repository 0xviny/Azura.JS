// src/examples/simple-app/src/index.ts
import { AzuraServer, Plugin } from "../../../src";
import { RequestServer } from "../../../src/core/Request";
import { ResponseServer } from "../../../src/core/Response";
import { RequestHandler } from "../../../src/core/Server";

// 1) plugin de auth corrigido para não retornar o res
interface AuthAPI {
  requireAuth(): RequestHandler;
}

const authPlugin: Plugin<AuthAPI> = {
  name: "auth",
  register(app) {
    return {
      requireAuth: () => {
        // RequestHandler: (req,res,next) => void | Promise<void>
        return (req: RequestServer, res: ResponseServer, next) => {
          const token = req.headers["authorization"];
          if (!token) {
            // apenas envie a resposta e encerre aqui
            res.status(401).json({ error: "Unauthorized" });
            return; // <-- não devolve ResponseServer, e não chama next()
          }
          next(); // prossegue normalmente
        };
      },
    };
  },
};

const app = new AzuraServer({ port: 3000, cluster: false });
const auth = app.registerPlugin(authPlugin)!;

// rota pública
app.get("/users", async (req: RequestServer, res: ResponseServer) => {
  const users = await app.db!.find("users", {});
  res.json(users);
});

// rota protegida
app.get(
  "/protected",
  auth.requireAuth(), // middleware que não retorna nada
  async (req: RequestServer, res: ResponseServer) => {
    res.json({ message: "Você está autenticado!" });
  }
);

app.listen();
