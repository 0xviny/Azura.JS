import { Schema } from "../types/validation.types";
import { HttpError } from "../utils/http.utils";

function isSchemaObject(schema: Schema): schema is Record<string, Schema> {
  return typeof schema === "object" && !Array.isArray(schema);
}

export function validateSchema(schema: Schema, data: unknown): void {
  if (typeof data !== "object" || data === null) {
    throw new HttpError(400, { message: "Payload inválido" });
  }

  if (!isSchemaObject(schema)) {
    throw new Error("Schema inválido: deve ser um objeto no topo");
  }

  const obj = data as Record<string, unknown>;

  for (const key of Object.keys(schema)) {
    const rule = schema[key];
    const val = obj[key];

    if (typeof rule === "string") {
      if (typeof val !== rule) {
        throw new HttpError(400, { message: `${key} deve ser ${rule}` });
      }
    } else if (Array.isArray(rule)) {
      if (!Array.isArray(val)) {
        throw new HttpError(400, { message: `${key} deve ser array` });
      }
    } else if (isSchemaObject(rule)) {
      validateSchema(rule, val);
    }
  }
}
