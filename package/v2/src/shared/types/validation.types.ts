export type PrimitiveType = "string" | "number" | "boolean";
export type Schema = PrimitiveType | Schema[] | { [key: string]: Schema };
