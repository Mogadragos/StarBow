export interface ISensor {
    addReadingCallback(callback: (data: number[]) => void): void;
    start(): void;
    stop(): void;
}
