#!/usr/bin/env node
import "reflect-metadata";
import { Command } from "commander";
import { createApp } from "./commands/create";

const program = new Command("@atosjs/azura");
program.version("0.1.0");

program
  .command("create <name> <options>")
  .description("Scaffold new NanoAPI app")
  .option("-l, --lang <ts|js>", "linguagem do projeto", "ts")
  .action(createApp);

program.parse(process.argv);
