export type ParamSource =
  | "param"
  | "query"
  | "body"
  | "headers"
  | "req"
  | "res"
  | "next"
  | "ip"
  | "useragent";

export interface ParamDefinition {
  index: number;            // índice do parâmetro na assinatura
  type: ParamSource;        // origem do valor
  name?: string;            // chave (p.ex. nome do param/query/body/header)
}

export interface RouteDefinition {
  method: string;           // "GET", "POST"…
  path: string;             // "/users/:id"
  propertyKey: string;      // nome do método no controller
  params: ParamDefinition[];// lista de ParamDefinitions
}
