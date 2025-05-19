import { RequestServer } from "../../shared/types/request.types";
import { ResponseServer } from "../../shared/types/response.types";
import { HttpError } from "../../shared/utils/http.utils";

export type Handler = (ctx: {
  req: RequestServer;
  res: ResponseServer;
  next?: (err?: any) => void;
}) => Promise<void> | void;

interface MatchResult {
  handlers: Handler[];
  params: Record<string, string>;
}

class Node {
  children = new Map<string, Node>();
  handlers = new Map<string, Handler[]>();
  paramName?: string;
  isParam?: boolean;
}

export class Router {
  private root = new Node();

  add(method: string, path: string, ...handlers: Handler[]) {
    const segments = path.split("/").filter(Boolean);
    let node = this.root;

    for (const seg of segments) {
      let child: Node;

      if (seg.startsWith(":")) {
        child = new Node();
        child.isParam = true;
        child.paramName = seg.slice(1);
      } else {
        child = node.children.get(seg) || new Node();
      }

      node.children.set(seg.startsWith(":") ? ":" : seg, child);
      node = child;
    }

    node.handlers.set(method.toUpperCase(), handlers);
  }

  find(method: string, path: string): MatchResult {
    const segments = path.split("/").filter(Boolean);
    let node = this.root;
    const params: Record<string, string> = {};

    for (const seg of segments) {
      if (node.children.has(seg)) {
        node = node.children.get(seg)!;
      } else if (node.children.has(":")) {
        node = node.children.get(":")!;

        if (node.isParam && node.paramName) {
          params[node.paramName] = seg;
        }
      } else {
        throw new HttpError(404, { message: "Route not found" });
      }
    }

    const handlers = node.handlers.get(method.toUpperCase()) as Handler[];
    // if (!handlers) throw new HttpError(404, { message: "Route not found" });

    return { handlers, params };
  }
}
