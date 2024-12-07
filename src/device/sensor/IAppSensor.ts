export interface IAppSensor {
    onReading?: (data: number[]) => void;

    init(frequency: number): Promise<void>;
    start(): void;
    stop(): void;
}
