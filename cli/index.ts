import "reflect-metadata";
import { Command } from "commander";
import { serve } from "./commands/serve";
import { migrate } from "./commands/migrate";
import { seed } from "./commands/seed";
import { createApp } from "./commands/create";

const program = new Command("azura");
program.version("0.1.0");

program
  .command("create <name> <options>")
  .description("Scaffold new NanoAPI app")
  .option("-l, --lang <ts|js>", "linguagem do projeto", "ts")
  .action(createApp);

program.command("serve").description("Rode o app em modo de desenvolvimento").action(serve);

program.command("migrate").description("Migrar banco de dados").action(migrate);
program.command("seed").description("Criar banco de dados").action(seed);

program.parse(process.argv);
