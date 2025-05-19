import { AzuraServer } from "../../src/infra/server/server";

const app = new AzuraServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen();
