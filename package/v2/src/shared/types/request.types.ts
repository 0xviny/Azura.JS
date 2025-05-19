import { IncomingMessage, IncomingHttpHeaders } from "http";

export interface RequestServer extends IncomingMessage {
  /** Montado pelo servidor: caminho sem query string */
  path: string;
  /** URL completa (inclui query string) */
  originalUrl: string;
  /** Método HTTP: GET, POST, etc */
  method: string;
  /** Protocolo ('http' ou 'https') */
  protocol: string;
  /** True se usou HTTPS */
  secure: boolean;
  /** Host da requisição (sem porta) */
  hostname: string;
  /** Subdomínios (se configurado) */
  subdomains: string[];
  /** IP do cliente */
  ip: string;
  /** Se estiver atrás de proxy, lista de IPs */
  ips?: string[];
  /** Parâmetros de rota (ex: /users/:id) */
  params: Record<string, string>;
  /** Query string (somente valores simples) */
  query: Record<string, string>;
  /** Corpo da requisição (JSON, form, etc) */
  body: any;
  /** Cookies parseados em key/value */
  cookies: Record<string, string>;
  /** Cabeçalhos originais */
  headers: IncomingHttpHeaders;

  /**
   * Recupera o valor de um header (case-insensitive).
   * Retorna o primeiro valor se houver array.
   */
  get(name: string): string | undefined;
  header(name: string): string | undefined; // alias
}
