class RecordsQueue {
  constructor(maxSize, key, queue = []) {
    this.maxSize = maxSize;
    this.key = key;
    this.queue = queue;
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

  loadLocal() {
    const localQueue = JSON.parse(localStorage.getItem(this.key)) || this.queue;
    this.queue = localQueue.slice(
      Math.max(localQueue.length - this.maxSize, 0)
    );
  }

  saveLocal() {
    localStorage.setItem(this.key, JSON.stringify(this.queue));
  }
}

export default RecordsQueue;
