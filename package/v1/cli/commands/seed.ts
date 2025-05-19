import { JSONAdapter } from "../../src/db/Database";

export async function seed() {
  const db = new JSONAdapter("seed-db.json");
  await db.connect();
  // popula coleções
}
