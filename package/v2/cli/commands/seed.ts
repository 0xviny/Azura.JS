import { JSONAdapter } from "../../src/infra/database/database.module";

export async function seed() {
  const db = new JSONAdapter("seed-db.json");
  await db.connect();
  // popula coleções
}
