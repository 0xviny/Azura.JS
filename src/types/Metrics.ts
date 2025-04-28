import client from "prom-client";

export interface MetricsRegistry {
  counter: typeof client.Counter;
  histogram: typeof client.Histogram;
  getMetrics(): Promise<string>;
}
