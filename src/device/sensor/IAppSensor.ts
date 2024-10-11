export interface IAppSensor {
    onReading?: (data: number[]) => void;

    init(): Promise<void>;
    start(): void;
    stop(): void;
}
