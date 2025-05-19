import "reflect-metadata";

// Core
export { AzuraServer } from "./infra/server/server";
export { Router } from "./infra/server/route";
export { Lifecycle, HookType } from "./plugins/lifecycle.plugin";
export { PluginLoader } from "./core/services/plugin-loader.service";

// Config & Env
export { Config as AzuraConfig } from "./shared/config/config.module";
export { EnvManager } from "./shared/config/env.manager";

// Decorators
export {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Req,
  Res,
  Next,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  UserAgent,
} from "./shared/decorators/decorator.module";
export { Hook } from "./shared/decorators/hooks.decorator";
export { Middleware } from "./shared/middleware/global.middleware";
export { Auth, Roles, Public } from "./shared/decorators/auth.decorator";
export { Socket } from "./shared/decorators/socket.decorator";

// Utils & Types
export { uuid, HttpError, logger } from "./shared/utils/http.utils";
export * from "./shared/types/http-context.types";
export * from "./shared/types/routes.types";
export * from "./shared/types/plugin.types";
export * from "./shared/types/metrics.types";
export * from "./shared/types/validation.types";

// Built-in Plugins
export { compress } from "./plugins/compression.plugin";
export { cors } from "./plugins/cors.plugin";
export { rateLimit } from "./plugins/rate-limit.plugin";
export { LRUCache } from "./plugins/cache.plugin";
export { serveStatic } from "./plugins/static.plugin";
export { metrics } from "./plugins/metric.plugin";
export { health } from "./plugins/health.plugin";
export { KeyManager } from "./modules/api-keys/api-key.manager";