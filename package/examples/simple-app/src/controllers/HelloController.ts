import { Controller } from "../../../../src/decorators/Controller";
import { Get } from "../../../../src/decorators/Route";

@Controller("/hello")
export class HelloController {
  @Get("/")
  async index(ctx: any) {
    ctx.response.writeHead(200, { "Content-Type": "application/json" });
    ctx.response.end(JSON.stringify({ message: "Olá do NanoAPI V4!" }));
  }
}
