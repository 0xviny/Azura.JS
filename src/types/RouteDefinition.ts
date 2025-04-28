import { Method } from "../decorators/Route";

export interface RouteDefinition {
  method: Method;
  path: string;
  property: string;
  schema?: any;
  middlewares?: string[];
}
