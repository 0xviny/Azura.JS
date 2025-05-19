import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export class EnvManager {
  private env: Record<string, string>;

  constructor(file = ".env") {
    const envPath = path.join(process.cwd(), file);
    this.env = fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath)) : {};
    Object.assign(process.env, this.env);
  }

  get(key: string, fallback?: string): string {
    return process.env[key] || this.env[key] || fallback!;
  }
}
