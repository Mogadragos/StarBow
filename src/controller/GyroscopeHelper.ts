export class GyroscopeHelper {
  gyroscope!: Gyroscope;

  isPresent(): boolean {
    return "Gyroscope" in window;
  }

  async isNotGranted(): Promise<boolean> {
    return navigator.permissions
      .query({ name: "gyroscope" as PermissionName })
      .then((result) => result.state != "granted");
  }

  init(): void {
    this.gyroscope = new Gyroscope({ frequency: 5 });
    return;
    this.gyroscope.addEventListener("reading", (e) => {
      document.body.innerHTML = `Angular velocity along the X-axis ${this.gyroscope.x}<br />
                                    Angular velocity along the Y-axis ${this.gyroscope.y}<br />
                                    Angular velocity along the Z-axis ${this.gyroscope.z}`;
    });
  }

  start(): void {
    this.gyroscope.start();
  }
}
