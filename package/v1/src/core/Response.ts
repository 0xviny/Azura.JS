import { ServerResponse } from "http";
import { SerializeOptions } from "cookie";

export interface CookieOptions extends SerializeOptions {}

/**
 * Nosso ResponseServer: extende ServerResponse **injetando** overloads de `end`
 * compatíveis com a base, mas retornando `this`.
 */
export interface ResponseServer extends ServerResponse {
  // —— Overloads de `end` (copiados da base, mas retornando this) ——
  end(cb?: () => void): this;
  end(chunk: any, cb?: () => void): this;
  end(chunk: any, encoding: string, cb?: () => void): this;

  /** true se headers já foram enviados */
  headersSent: boolean;

  /** Código de status e encadeável */
  status(code: number): this;

  /** Define um header (encadeável) */
  set(field: string, value: string | number | string[]): this;
  header(field: string, value: string | number | string[]): this;

  /** Recupera um header (primeiro valor de array) */
  get(field: string): string | undefined;

  /** Define o Content-Type e retorna this */
  type(type: string): this;
  contentType(type: string): this;

  /** Define o header Location e faz redirect padrão (302) */
  redirect(url: string): this;
  /** Redirect com status customizado */
  redirect(status: number, url: string): this;

  /** Define apenas Location sem encerrar */
  location(url: string): this;

  /** Envia um cookie (encadeável) */
  cookie(name: string, value: string, options?: CookieOptions): this;
  /** Limpa um cookie */
  clearCookie(name: string, options?: CookieOptions): this;

  /** Envia corpo e encerra (encadeável) */
  send(body: any): this;

  /** Envia JSON e encerra (encadeável) */
  json(body: any): this;
}
