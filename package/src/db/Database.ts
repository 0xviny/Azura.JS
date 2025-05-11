export interface DBAdapter {
  connect(): Promise<void>;
  find<T = any>(collection: string, query?: any): Promise<T[]>;
  insert<T = any>(collection: string, doc: T): Promise<T>;
  update(collection: string, query: any, update: any): Promise<number>;
  delete(collection: string, query: any): Promise<number>;
}

// JSON File
export class JSONAdapter implements DBAdapter {
  constructor(private file = "db.json") {}
  private db: Record<string, any[]> = {};
  async connect() {
    try {
      this.db = require(process.cwd() + "/" + this.file);
    } catch {
      this.db = {};
    }
  }
  private save() {
    require("fs").writeFileSync(this.file, JSON.stringify(this.db, null, 2));
  }
  async find(col: string) {
    return this.db[col] || [];
  }
  async insert<T>(col: string, doc: T) {
    if (!this.db[col]) this.db[col] = [];
    this.db[col].push(doc);
    this.save();
    return doc;
  }
  async update(col: string, q: any, u: any) {
    const arr = this.db[col] || [];
    let count = 0;
    arr.forEach((d) => {
      if (Object.keys(q).every((k) => d[k] === q[k])) {
        Object.assign(d, u);
        count++;
      }
    });
    this.save();
    return count;
  }
  async delete(col: string, q: any) {
    const arr = this.db[col] || [];
    const before = arr.length;
    this.db[col] = arr.filter((d) => !Object.keys(q).every((k) => d[k] === q[k]));
    this.save();
    return before - this.db[col].length;
  }
}
