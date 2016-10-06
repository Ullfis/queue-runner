
export default class {

  private items: any[] = [];
  private queueRunning: boolean = false;
  private pauseQueue: boolean = false;

  constructor(
    public fnRunner: (item: any, next: () => void) => void,
    public fnEnd?: () => void,
    public fnPause?: () => void) {}

  /** Push item to queue and start queue if not already running */
  public push(item: any): void {
    this.items.push(item);
    this.startQueue();
  }

  /** Return number of queued items */
  public get length(): number {
    return this.items.length;
  }

  /** Pause queue runner */
  public pause(): void {
    this.pauseQueue = true;
  }

  /** Resume queue runner */
  public resume(): void {
    this.pauseQueue = this.queueRunning = false;
    this.startQueue();
  }

  /** Queue runner */
  private startQueue() {
    if (this.queueRunning) return;
    this.queueRunning = true;
    let that = this;

    function stopQueue() {
      that.queueRunning = false;
      if (that.fnEnd) that.fnEnd();
    }

    function queue() {
      // check if queue is finish
      if (that.items.length < 0) {
        stopQueue();
        return;
      }
      // pause queue
      if (that.pauseQueue) {
        if (that.fnPause) that.fnPause();
        return;
      }

      // get item to queue
      let item = that.items.shift();
      if (item === undefined) {
        stopQueue();
        return;
      }

      that.fnRunner(item, queue);
    }

    queue();
  }

}
