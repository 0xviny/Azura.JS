import fs from "fs";
const FLAGS_FILE = "flags.json";
export function flags(action: "list" | "add" | "remove", key?: string) {
  let flags = fs.existsSync(FLAGS_FILE) ? JSON.parse(fs.readFileSync(FLAGS_FILE, "utf-8")) : {};
  if (action === "list") return console.table(flags);
  if (action === "add" && key) flags[key] = true;
  if (action === "remove" && key) delete flags[key];
  fs.writeFileSync(FLAGS_FILE, JSON.stringify(flags, null, 2));
  console.log("Flags atualizadas.");
}
