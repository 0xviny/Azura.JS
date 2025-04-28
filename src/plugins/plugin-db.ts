import { Plugin } from "../core/PluginLoader";
import { JSONAdapter } from "../db/Database";
import { MongoAdapter } from "../db/MongoAdapter";
import { PostgresAdapter } from "../db/PostgresAdapter";

export const dbPlugin: Plugin = {
  name: "db",
  register(app, opts) {
    let adapter;
    switch (opts.type) {
      case "mongo":
        adapter = new MongoAdapter(opts.uri, opts.db);
        break;
      case "postgres":
        adapter = new PostgresAdapter(opts.pg);
        break;
      default:
        adapter = new JSONAdapter(opts.file);
    }
    adapter.connect().then(() => app.decorate("db", adapter));
  },
};
