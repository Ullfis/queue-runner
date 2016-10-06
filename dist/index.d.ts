export default class  {
    fnRunner: (item: any, next: () => void) => void;
    fnEnd: () => void;
    fnPause: () => void;
    private items;
    private queueRunning;
    private pauseQueue;
    constructor(fnRunner: (item: any, next: () => void) => void, fnEnd?: () => void, fnPause?: () => void);
    push(item: any): void;
    readonly length: number;
    pause(): void;
    resume(): void;
    private startQueue();
}
