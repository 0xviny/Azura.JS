export class LRUCache<K, V> {
  private maxSize: number;
  private map = new Map<K, V>();

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.map = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const value = this.map.get(key);

    if (value) {
      this.map.delete(key);
      this.map.set(key, value);
    }

    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);

    if (this.map.size > this.maxSize) {
      this.map.delete(this.map.keys().next().value!);
    }
  }
}
