import fs from "fs";
import path from "path";
import ejs from "ejs";

export function generate(type: "controller" | "service" | "plugin", name: string) {
  const tplDir = path.resolve(__dirname, "../templates", type);
  const files = fs.readdirSync(tplDir);
  files.forEach((file) => {
    const content = fs.readFileSync(path.join(tplDir, file), "utf-8");
    const out = ejs.render(content, { name });
    const targetDir = path.resolve(process.cwd(), "src", type + "s");
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    const outFile = path.join(targetDir, file.replace("tpl", name));
    fs.writeFileSync(outFile, out);
    console.log(`${type} ${outFile} criado.`);
  });
}
