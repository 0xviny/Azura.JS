import fs from "fs";
import path from "path";

export function addPlugin(action: string, pluginName?: string) {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  if (action === "add" && pluginName) {
    const plugins = pkg.dependencies || {};
    plugins[`@atosjs/azura/plugin-${pluginName}`] = "latest";
    pkg.dependencies = plugins;
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
    console.log(`Plugin ${pluginName} added.`);
  }
}
