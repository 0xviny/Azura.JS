import { Pool } from "pg";
import { DBAdapter } from "./Database";

export class PostgresAdapter implements DBAdapter {
  private pool: Pool;

  constructor(opts: any = {}) {
    this.pool = new Pool(opts);
  }

  async connect(): Promise<void> {}

  async find<T = any>(table: string): Promise<T[]> {
    const res = await this.pool.query(`SELECT * FROM ${table}`);
    return res.rows as T[];
  }

  async insert<T = any>(table: string, doc: any): Promise<T> {
    const cols = Object.keys(doc).join(",");
    const vals = Object.values(doc);
    const params = vals.map((_, i) => `$${i + 1}`).join(",");
    await this.pool.query(`INSERT INTO ${table}(${cols}) VALUES(${params})`, vals);
    return doc;
  }

  async update(table: string, q: any, u: any): Promise<number> {
    const setClauses = Object.keys(u)
      .map((k, i) => `${k} = $${i + 1}`)
      .join(",");
    const whereClauses = Object.keys(q)
      .map((k, i) => `${k} = $${Object.keys(u).length + i + 1}`)
      .join(" AND ");
    const vals = [...Object.values(u), ...Object.values(q)];
    const res = await this.pool.query(
      `UPDATE ${table} SET ${setClauses} WHERE ${whereClauses}`,
      vals
    );
    return res.rowCount!;
  }

  async delete(table: string, q: any): Promise<number> {
    const whereClauses = Object.keys(q)
      .map((k, i) => `${k} = $${i + 1}`)
      .join(" AND ");
    const res = await this.pool.query(
      `DELETE FROM ${table} WHERE ${whereClauses}`,
      Object.values(q)
    );
    return res.rowCount!;
  }
}
