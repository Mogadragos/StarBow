export interface BaseSensorHelper {
    onRead?: (data: any) => void;

    isPresent(): boolean;
    isPermissionGranted(): Promise<boolean>;
    init(frequency?: number): Promise<void> | void;
    start(): void;
    stop(): void;
}
