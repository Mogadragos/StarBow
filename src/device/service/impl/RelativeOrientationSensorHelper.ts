import { AbstractOrientationSensorHelper } from "../abstract/AbstractOrientationSensorHelper";

export class RelativeOrientationSensorHelper extends AbstractOrientationSensorHelper {
    override async init(): Promise<void> {
        await super.init();
        this.sensor = new RelativeOrientationSensor({ frequency: 12 });
    }

    isPresent(): boolean {
        return "RelativeOrientationSensor" in window;
    }

    async isPermissionGranted(): Promise<boolean> {
        return Promise.all([
            navigator.permissions.query({
                name: "accelerometer" as PermissionName,
            }),
            navigator.permissions.query({
                name: "gyroscope" as PermissionName,
            }),
        ]).then((results) =>
            results.every((result) => result.state === "granted"),
        );
    }
}
