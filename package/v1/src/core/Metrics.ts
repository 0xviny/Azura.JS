import client from "prom-client";

const register = new client.Registry();
const httpReqs = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests",
  registers: [register],
});
const httpLatency = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  registers: [register],
});

export function metrics() {
  return async (next: Function) => {
    const end = httpLatency.startTimer();
    httpReqs.inc();
    await next();
    end();
  };
}

export function metricsEndpoint() {
  return () => register.metrics();
}
