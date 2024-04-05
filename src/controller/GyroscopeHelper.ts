export class GyroscopeHelper {
  gyroscope!: Gyroscope;

  onRead?: (data: { x?: number; y?: number; z?: number }) => void;

  isPresent(): boolean {
    return "Gyroscope" in window;
  }

  async isNotGranted(): Promise<boolean> {
    return navigator.permissions
      .query({ name: "gyroscope" as PermissionName })
      .then((result) => result.state != "granted");
  }

  init(frequency = 1): void {
    this.gyroscope = new Gyroscope({ frequency });
    this.gyroscope.addEventListener(
      "reading",
      () =>
        this.onRead &&
        this.onRead({
          x: this.gyroscope.x,
          y: this.gyroscope.y,
          z: this.gyroscope.z,
        })
    );
  }

  start(): void {
    this.gyroscope.start();
  }

  stop(): void {
    this.gyroscope.stop();
  }
}
