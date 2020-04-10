class RecordsQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
  }

  add(value) {
    this.queue.push(value);
    if (this.queue.length > this.maxSize) {
      this.queue.shift();
    }
  }

  getLast() {
    return this.queue[this.queue.length - 1];
  }

  loadLocal(key) {
    const localQueue = localStorage.getItem(key);
    this.queue = localQueue.slice(
      Math.max(localQueue.length - this.maxSize, 0)
    );
  }

  saveLocal(key) {
    localStorage.setItem(key, this.queue);
  }
}

export default RecordsQueue;
