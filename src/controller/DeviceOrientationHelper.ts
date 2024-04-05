import { BaseSensorHelper } from "../shared/BaseSensorHelper";

type IOS13DeviceOrientationEvent = typeof window.DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

export class DeviceOrientationHelper implements BaseSensorHelper {
  private interval: number = 0;
  private prevTime: number = 0;
  private onDeviceOrientation?: (e: DeviceOrientationEvent) => void;

  private degreeToRadiant(degree: number): number {
    return degree ? degree * (Math.PI / 180) : 0;
  }

  onRead?: (data: { x: number; y: number; z: number }) => void;

  isPresent(): boolean {
    return !!window.DeviceOrientationEvent;
  }

  async isPermissionGranted(): Promise<boolean> {
    const IOS13Event =
      window.DeviceOrientationEvent as IOS13DeviceOrientationEvent;
    if (IOS13Event.requestPermission) {
      return IOS13Event.requestPermission().then((state) => state == "granted");
    }

    return true;
  }

  init(frequency = 24): void {
    this.interval = 1000 / frequency;
    this.prevTime = 0;
    this.onDeviceOrientation = (e: DeviceOrientationEvent) => {
      const now = Date.now();
      if (now - this.prevTime > this.interval) {
        this.prevTime = now;
        this.onRead &&
          this.onRead({
            x: this.degreeToRadiant(e.gamma ?? 0),
            y: this.degreeToRadiant(e.alpha ?? 0),
            z: this.degreeToRadiant(e.beta ?? 0),
          });
      }
    };
  }

  start(): void {
    this.onDeviceOrientation &&
      window.addEventListener(
        "deviceorientationabsolute",
        this.onDeviceOrientation
      );
  }

  stop(): void {
    this.onDeviceOrientation &&
      window.removeEventListener(
        "deviceorientationabsolute",
        this.onDeviceOrientation
      );
  }
}
