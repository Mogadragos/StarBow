import { AbstractAppSensorOrientation } from "../abstract/AbstractAppSensorOrientation";
import { RelativeOrientationSensor as RelativeOrientationSensorPolyfill } from "motion-sensors-polyfill";

declare global {
    interface Window {
        RelativeOrientationSensor?: any;
    }
}

export class AppSensorRelativeOrientation extends AbstractAppSensorOrientation {
    override async init(frequency: number): Promise<void> {
        await super.init(frequency);
        this.sensor = new RelativeOrientationSensor({ frequency: frequency });
    }

    override setPolyfill(): boolean {
        window.RelativeOrientationSensor = RelativeOrientationSensorPolyfill;
        return true;
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
