import { HTTPError } from "./Utils";

type Handler = (ctx: any) => Promise<void> | void;

class Node {
  children = new Map<string, Node>();
  handlers = new Map<string, Handler>();
}

export class Router {
  private root = new Node();

  add(method: string, path: string, handler: Handler): void {
    const segments = path.split("/").filter(Boolean);
    let node = this.root;
    for (const seg of segments) {
      if (!node.children.has(seg)) node.children.set(seg, new Node());
      node = node.children.get(seg)!;
    }
    node.handlers.set(method.toUpperCase(), handler);
  }

  find(method: string, path: string): Handler {
    const segments = path.split("/").filter(Boolean);
    let node = this.root;
    for (const seg of segments) {
      node = node.children.get(seg) || node;
    }
    const handler = node.handlers.get(method.toUpperCase());
    if (!handler) throw new HTTPError(404, { message: "Route not found" });
    return handler;
  }
}
