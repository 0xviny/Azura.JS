import { HTTPError } from "../core/Utils";

let idCounter = 0;
const pending = new Map<number, Function>();

export function rpcCall(ws: any, method: string, params: any) {
  return new Promise((resolve, reject) => {
    const id = ++idCounter;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ jsonrpc: "2.0", id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new HTTPError(504, { message: "RPC timeout" }));
      }
    }, 5000);
  });
}

export function rpcHandler(ws: any, data: any) {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)!(msg.result);
    pending.delete(msg.id);
  }
}
