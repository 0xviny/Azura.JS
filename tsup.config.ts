import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli/index.ts"],
  dts: true,
  format: ["cjs", "esm"],
  outDir: "dist",
  splitting: false,
  clean: true,
  sourcemap: true,
  outExtension: (ctx) => ({
    js: ctx.format === "esm" ? ".mjs" : ".cjs",
  }),
});
