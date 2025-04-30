import { app } from "..";
import { Controller } from "../../../../src/decorators/Controller";
import { Get } from "../../../../src/decorators/Route";

@Controller("/hello")
export class HelloController {
  @Get("/")
  async index(req: any, res: any) {
    const users = await app.db?.find("users", {});

    res.json(users);
  }
}
