import { logger } from "../core/Utils";

export function setupGracefulShutdown(server: any) {
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((sig) =>
    process.on(sig, () => {
      logger("info", `Received ${sig}, shutting down...`);
      server.close(() => {
        logger("info", "Shutdown complete.");
        process.exit(0);
      });
    })
  );
}
