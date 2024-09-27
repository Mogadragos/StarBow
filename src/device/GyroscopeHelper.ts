import { BaseSensorHelper } from "../shared/BaseSensorHelper";

export class GyroscopeHelper implements BaseSensorHelper {
  private gyroscope!: Gyroscope;
  private rotation = { x: 0, y: 0, z: 0 };

  onRead?: (data: { x?: number; y?: number; z?: number }) => void;

  isPresent(): boolean {
    return "Gyroscope" in window;
  }

  async isPermissionGranted(): Promise<boolean> {
    return navigator.permissions
      .query({ name: "gyroscope" as PermissionName })
      .then((result) => result.state == "granted");
  }

  init(frequency = 12): void {
    this.gyroscope = new Gyroscope({ frequency });
    this.gyroscope.addEventListener("reading", () => {
      this.rotation.x += (this.gyroscope.x ?? 0) / 10;
      this.rotation.y += (this.gyroscope.z ?? 0) / 10;
      this.rotation.z += (this.gyroscope.y ?? 0) / 10;
      this.onRead && this.onRead(this.rotation);
    });
  }

  start(): void {
    this.gyroscope.start();
  }

  stop(): void {
    this.gyroscope.stop();
  }
}
