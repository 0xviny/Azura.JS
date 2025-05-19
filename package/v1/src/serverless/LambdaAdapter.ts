import { AzuraServer } from "../core/Server";
import { APIGatewayProxyHandler } from "aws-lambda";

export function lambdaHandler(app: AzuraServer): APIGatewayProxyHandler {
  return async (event) => {
    const { headers, httpMethod, path } = event;
    let responseBody: any,
      status = 200;
    const fakeReq: any = {
      method: httpMethod,
      url: path + (event.queryStringParameters ? "?" + event.queryStringParameters : ""),
      headers,
    };
    const fakeRes: any = {
      statusCode: 200,
      headers: {},
      body: "",
      writeHead: (s: number, h: any) => {
        status = s;
        fakeRes.headers = h;
      },
      end: (b: any) => {
        responseBody = b;
      },
    };
    await app["handle"](fakeReq, fakeRes);
    return { statusCode: status, headers: fakeRes.headers, body: responseBody };
  };
}
