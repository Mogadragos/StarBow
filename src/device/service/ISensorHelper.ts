export interface ISensorHelper {
    addReadingCallback(callback: (data: number[]) => void): void;
    start(): void;
    stop(): void;
}
