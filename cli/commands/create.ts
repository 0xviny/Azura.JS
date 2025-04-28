import fs from "fs";
import path from "path";
import ejs from "ejs";

const templateRoot = path.resolve(__dirname, "../templates");

async function copyTemplate(srcDir: string, destDir: string, context: Record<string, any> = {}) {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir);
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry);
    const stat = await fs.promises.stat(srcPath);
    const isEjs = entry.endsWith(".ejs");
    // remove .ejs suffix for destination
    const destName = isEjs ? entry.slice(0, -4) : entry;
    const destPath = path.join(destDir, destName);
    if (stat.isDirectory()) {
      await copyTemplate(srcPath, destPath, context);
    } else {
      let content = await fs.promises.readFile(srcPath, "utf8");
      if (isEjs) {
        content = ejs.render(content, context);
      }
      await fs.promises.writeFile(destPath, content, "utf8");
    }
  }
}

export function createApp(name: string, langOpt: string) {
  const lang = langOpt.toLowerCase();

  if (!["ts", "js"].includes(lang)) {
    console.error(`❌ Linguagem inválida. Use "ts" ou "js".`);
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Diretório "${name}" já existe.`);
    process.exit(1);
  }

  // Escolhe o template conforme a linguagem
  const templateDir = path.join(templateRoot, `project-${lang}`);
  if (!fs.existsSync(templateDir)) {
    console.error(`❌ Template para "${lang}" não encontrado em ${templateDir}`);
    process.exit(1);
  }

  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  const context = { name, Name };

  copyTemplate(templateDir, targetDir, context)
    .then(() => {
      console.log(`✅ Projeto "${name}" (${lang}) criado em ${targetDir}`);
      console.log(`> cd ${name} && npm install && npm run build && npm start`);
    })
    .catch((err) => {
      console.error("❌ Erro ao criar o projeto:", err);
    });
}
