import { RequestServer } from "./request.types";
import { ResponseServer } from "./response.types";

export type RequestHandler = (
  req: RequestServer,
  res: ResponseServer,
  next: (err?: any) => void
) => Promise<void> | void;

export type InternalHandler = (ctx: {
  request: RequestServer;
  response: ResponseServer;
}) => Promise<void> | void;

export function adaptRequestHandler(h: RequestHandler): InternalHandler {
  return async ({ request: req, response: res }) => {
    await new Promise<void>((resolve, reject) => {
      try {
        const maybe = h(req, res, (err) => (err ? reject(err) : resolve()));
        if (maybe instanceof Promise) {
          maybe.then(() => resolve()).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  };
}
