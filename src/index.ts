// src/index.ts
import "reflect-metadata";

// Core
export { Server, ServerOptions } from "./core/Server";
export { Router } from "./core/Router";
export { Lifecycle, HookType } from "./core/Lifecycle";
export { PluginLoader, Plugin } from "./core/PluginLoader";

// Config & Env
export { ConfigManager } from "./config/ConfigManager";
export { EnvManager } from "./config/EnvManager";

// Decorators
export { Controller } from "./decorators/Controller";
export { Get, Post, Put, Delete, Options } from "./decorators/Route";
export { Hook } from "./decorators/Hook";
export { Middleware } from "./decorators/Middleware";
export { Auth, Roles, Public } from "./decorators/Auth";
export { Socket } from "./decorators/Socket";
export { OpenAPI, Schema } from "./decorators/Docs";

// Utils & Types
export { uuid, HTTPError, logger } from "./core/Utils";
export * from "./types/HttpContext";
export * from "./types/RouteDefinition";
export * from "./types/Plugin";
export * from "./types/Metrics";
export * from "./types/DTO";

// Built-in Plugins
export { compressionPlugin } from "./plugins/plugin-compression";
export { corsPlugin } from "./plugins/plugin-cors";
export { rateLimitPlugin } from "./plugins/plugin-rate-limit";
export { cachePlugin } from "./plugins/plugin-cache";
export { errorPagePlugin } from "./plugins/plugin-error-page";
export { apmPlugin } from "./integrations/APM";
export { graphqlPlugin } from "./plugins/plugin-graphql";
export { redisCachePlugin } from "./plugins/plugin-redis-cache";

// DB Adapters & Plugin
export { JSONAdapter, DBAdapter } from "./db/Database";
export { MongoAdapter } from "./db/MongoAdapter";
export { PostgresAdapter } from "./db/PostgresAdapter";
export { dbPlugin } from "./plugins/plugin-db";

// Other Integrations
export { createWSS } from "./ws/WebSocketServer";
export { rpcCall, rpcHandler } from "./rpc/RPC";
export { lambdaHandler } from "./serverless/LambdaAdapter";
export { vercelHandler } from "./serverless/VercelAdapter";
export { metrics, metricsEndpoint } from "./core/Metrics";
export { health } from "./core/Health";
export { serveStatic } from "./core/Static";
