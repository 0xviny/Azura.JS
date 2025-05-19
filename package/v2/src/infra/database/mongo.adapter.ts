import { MongoClient, Db, WithId, Document, OptionalUnlessRequiredId } from "mongodb";
import { DBAdapter } from "./database.module";

export class MongoAdapter implements DBAdapter {
  private client!: MongoClient;
  private db!: Db;

  constructor(private uri = "mongodb://localhost:27017", private dbName = "azura-api") {}

  async connect() {
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  async find<T = any>(col: string, q: any = {}): Promise<T[]> {
    const arr: WithId<Document>[] = await this.db.collection(col).find(q).toArray();

    return arr.map((item) => {
      const { _id, ...rest } = item;
      return rest as T;
    });
  }

  async insert<T = any>(col: string, doc: T): Promise<T> {
    await this.db.collection(col).insertOne(doc as OptionalUnlessRequiredId<T>);
    return doc;
  }

  async update(col: string, q: any, u: any): Promise<number> {
    const r = await this.db.collection(col).updateMany(q, { $set: u });
    return r.modifiedCount;
  }

  async delete(col: string, q: any): Promise<number> {
    const r = await this.db.collection(col).deleteMany(q);
    return r.deletedCount ?? 0;
  }
}
