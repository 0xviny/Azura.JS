import { Client } from "pg";
export async function migrate() {
  const client = new Client(/*…*/);
  await client.connect();
  // execute arquivos SQL em migrations/
}
