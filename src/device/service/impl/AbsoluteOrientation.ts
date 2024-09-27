import { AbstractSensor } from "../abstract/AbstractSensor";

export class AbsoluteOrientation extends AbstractSensor {
    private sensor!: AbsoluteOrientationSensor;

    override async init(): Promise<void> {
        await super.init();
        this.sensor = new AbsoluteOrientationSensor({ frequency: 12 });
    }

    isPresent(): boolean {
        return "AbsoluteOrientationSensor" in window;
    }

    async isPermissionGranted(): Promise<boolean> {
        return Promise.all([
            navigator.permissions.query({
                name: "accelerometer" as PermissionName,
            }),
            navigator.permissions.query({
                name: "magnetometer" as PermissionName,
            }),
            navigator.permissions.query({
                name: "gyroscope" as PermissionName,
            }),
        ]).then((results) =>
            results.every((result) => result.state === "granted")
        );
    }

    addReadingCallback(callback: (data: number[]) => void): void {
        this.sensor.addEventListener("reading", () =>
            callback(this.sensor.quaternion ? this.sensor.quaternion : [])
        );
    }

    start(): void {
        this.sensor.start();
    }

    stop(): void {
        this.sensor.stop();
    }
}
