import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";

function copyTemplates() {
  const src = "cli/templates";
  const dest = "dist/cli/templates";

  const copyRecursive = (srcDir: string, destDir: string) => {
    mkdirSync(destDir, { recursive: true });
    const items = readdirSync(srcDir);

    for (const item of items) {
      const srcPath = join(srcDir, item);
      const destPath = join(destDir, item);

      if (statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  };

  copyRecursive(src, dest);
}

export default defineConfig({
  entry: ["src/index.ts", "cli/index.ts"],
  dts: true,
  format: ["cjs", "esm"],
  outDir: "dist",
  splitting: false,
  clean: true,
  sourcemap: true,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
  onSuccess: async () => {
    console.log("✅ Build finalizado. Copiando templates...");
    copyTemplates();
    console.log("✅ Templates copiados para dist/cli/templates!");
  },
});
