import { HTTPError } from "../core/Utils";

export function validateSchema(schema: any, data: any): void {
  if (typeof data !== "object" || data === null) {
    throw new HTTPError(400, { message: "Payload inválido" });
  }
  for (const key of Object.keys(schema)) {
    const rule = schema[key];
    const val = data[key];
    if (rule === "string" || rule === "number" || rule === "boolean") {
      if (typeof val !== rule) {
        throw new HTTPError(400, { message: `${key} deve ser ${rule}` });
      }
    } else if (Array.isArray(rule)) {
      if (!Array.isArray(val)) {
        throw new HTTPError(400, { message: `${key} deve ser array` });
      }
    } else if (typeof rule === "object") {
      validateSchema(rule, val);
    }
  }
}
