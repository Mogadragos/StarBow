export interface BaseSensorHelper {
  onRead?: (data: any) => void;

  isPresent(): boolean;
  isPermissionGranted(): Promise<boolean>;
  init(frequency?: number): void;
  start(): void;
  stop(): void;
}
