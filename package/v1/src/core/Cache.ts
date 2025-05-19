export class LRU<K, V> {
  private max: number;
  private map = new Map<K, V>();
  constructor(max = 1000) {
    this.max = max;
  }

  get(key: K): V | undefined {
    const val = this.map.get(key);
    if (val) {
      this.map.delete(key);
      this.map.set(key, val);
    }
    return val;
  }

  set(key: K, value: V) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.max) {
      const first = this.map.keys().next().value;
      this.map.delete(first!);
    }
  }
}
