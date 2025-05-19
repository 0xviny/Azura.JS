import { createSign, createVerify } from "crypto";
import { HttpError } from "../../shared/utils/http.utils";

const ISSUER = "Azura_Admin";

export class JwtManager {
  private privateKey = `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----`;
  private publicKey = `-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----`;

  sign(payload: object): string {
    const sign = createSign("SHA256");
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64");
    const body = Buffer.from(
      JSON.stringify({ ...payload, iss: ISSUER, exp: Date.now() + 3600 * 1000 })
    ).toString("base64");

    sign.update(`${header}.${body}`);
    const signature = sign.sign(this.privateKey, "base64");
    return `${header}.${body}.${signature}`;
  }

  verify(token: string): any {
    const [h, b, s] = token.split(".");
    const verify = createVerify("SHA256");

    verify.update(`${h}.${b}`);
    if (!verify.verify(this.publicKey, s, "base64")) {
      throw new HttpError(401, { message: "O token enviado é inválido!" });
    }

    return JSON.parse(Buffer.from(b, "base64").toString());
  }
}
