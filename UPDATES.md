# Azura Framework

> Ultra-light, decorator-driven HTTP framework inspirado no Express.js, com suporte completo a TypeScript e JavaScript puro.

---

## 🚀 Principais novidades (vX.Y.Z)

- **Decorators** para controllers e rotas (`@Controller`, `@Get`, `@Post`, etc.)
- **Injeção de parâmetros** com decorators:  
  `@Req()`, `@Res()`, `@Next()`, `@Param()`, `@Query()`, `@Body()`, `@Headers()`, `@Ip()`, `@UserAgent()`
- **Plugins** tipados — exemplo: `authPlugin.requireAuth()`
- **Suporte total a JavaScript** (sem necessidade de decorators/metadata — basta passar handlers)
- **API idêntica ao Express**: `req.query`, `req.params`, `req.cookies`, `req.body`, `req.ip`, helpers `res.send()`, `res.json()`, `res.status()`, `res.set()`, `res.get()`
- **Cluster mode**, lifecycle hooks, WebSocket hooks, etc.

---

## 📦 Instalação

```bash
npm install azura-framework
# ou
yarn add azura-framework
````

### Estrutura de pastas sugerida

```
src/
  core/
    Server.ts
    Request.ts
    Response.ts
    Router.ts
    Lifecycle.ts
    PluginLoader.ts
  decorators/
    Decorators.ts
  types/
    RouteDefinition.ts
  utils/
    Utils.ts
examples/
  simple-app/
    src/
      index.ts
      controllers/
        UserController.ts
README.md
```

---

## 💡 Exemplo completo em TypeScript

```ts
// src/controllers/UserController.ts
import {
  Controller, Get, Post, Param, Query, Body,
  Req, Res, Ip, UserAgent
} from "azura-framework/decorators";

@Controller("/users")
export class UserController {
  @Get("/")
  async list(
    @Req() req,
    @Res() res
  ) {
    // req.query, req.ip, req.userAgent já estão prontos
    const all = await this.someDb.find("users");
    return res.json(all);
  }

  @Get("/:id")
  getOne(
    @Param("id") id: string,
    @Query("verbose") v: string,
    @Ip() ip: string,
    @UserAgent() ua: string,
    @Headers("host") host: string,
    @Res() res
  ) {
    return res.json({ id, verbose: v, ip, ua, host });
  }

  @Post("/")
  create(
    @Body("name") name: string,
    @Body("email") email: string,
    @Res() res
  ) {
    const user = this.someDb.create({ name, email });
    return res.status(201).json(user);
  }
}
```

```ts
// src/index.ts
import { AzuraServer } from "azura-framework/core/Server";
import { UserController } from "./controllers/UserController";
import { dbPlugin } from "./plugins/dbPlugin";
import { Plugin } from "azura-framework";

interface AuthAPI {
  requireAuth(): ReturnType<Plugin<AuthAPI>["register"]>;
}

const authPlugin: Plugin<AuthAPI> = {
  name: "auth",
  register(app) {
    return {
      requireAuth: () => (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }
        next();
      },
    };
  },
};

async function bootstrap() {
  const app = new AzuraServer({ port: 3000, cluster: false });

  // plugins
  app.registerPlugin(dbPlugin, { /* opts */ }).connect();
  const auth = app.registerPlugin(authPlugin)!;

  // routes
  app.get("/public", (req, res) => res.send("Hello, world!"));
  app.get("/users", auth.requireAuth(), async (req, res) => {
    const users = await app.db!.find("users");
    res.json(users);
  });

  // controllers via decorators
  app.load([UserController]);

  app.listen();
}

bootstrap();
```

---

## 📜 Exemplo em JavaScript (sem decorators)

```js
// controllers/ProductController.js
class ProductController {
  async list(req, res) {
    const prods = await req.app.db.getAll("products");
    res.json(prods);
  }

  getOne(req, res) {
    res.json({ id: req.params.id });
  }
}

module.exports = ProductController;
```

```js
// index.js
const { AzuraServer } = require("azura-framework/core/Server");
const ProductController = require("./controllers/ProductController");

const app = new AzuraServer({ port: 3000 });
app.db = /* seu DBAdapter */;
app.get("/ping", (req, res) => res.send("pong"));
app.get("/products", (req, res) => new ProductController().list(req, res));
app.get("/products/:id", (req, res) => new ProductController().getOne(req, res));
app.listen();
```

---

## 🛠️ API de Decorators

| Decorator                    | Descrição                                       |
| ---------------------------- | ----------------------------------------------- |
| `@Controller(path?: string)` | Prefixo de rota para todos os métodos da classe |
| `@Get(path?: string)`        | Rota GET                                        |
| `@Post(path?: string)`       | Rota POST                                       |
| `@Put(path?: string)`        | Rota PUT                                        |
| `@Delete(path?: string)`     | Rota DELETE                                     |
| `@Patch(path?: string)`      | Rota PATCH                                      |

| Param Decorator   | Origem do valor em `req`             |
| ----------------- | ------------------------------------ |
| `@Req()`          | objeto `req` inteiro                 |
| `@Res()`          | objeto `res` inteiro                 |
| `@Next()`         | função `next`                        |
| `@Param(name?)`   | `req.params[name]` ou `req.params`   |
| `@Query(name?)`   | `req.query[name]` ou `req.query`     |
| `@Body(name?)`    | `req.body[name]` ou `req.body`       |
| `@Headers(name?)` | `req.headers[name]` ou `req.headers` |
| `@Ip()`           | `req.ip`                             |
| `@UserAgent()`    | `req.headers['user-agent']`          |

---

## 🔌 Plugins

1. Defina sua interface de API:

   ```ts
   interface AuthAPI {
     requireAuth(): RequestHandler;
   }
   ```
2. Implemente `Plugin<AuthAPI>`:

   ```ts
   const authPlugin: Plugin<AuthAPI> = {
     name: "auth",
     register(app) {
       return { /* sua API */ };
     },
   };
   ```
3. Registre:

   ```ts
   const auth = app.registerPlugin(authPlugin)!;
   app.get("/secret", auth.requireAuth(), handler);
   ```

---

## 🎯 Hooks e Lifecycle

* `app.onHook(type: HookType, fn: (ctx, next) => void)`
* Tipos suportados: `"onRequest"`, `"preValidation"`, `"onResponse"`, etc.

---

## 📞 Suporte

Abra uma issue em [https://github.com/0xviny/Azura.JS](https://github.com/0xviny/Azura.JS) ou envie mensagem para o maintainer.

---

© 2025 Azura Framework — código aberto, MIT License.