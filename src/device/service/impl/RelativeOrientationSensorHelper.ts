import { AbstractOrientationSensorHelper } from "../abstract/AbstractOrientationSensorHelper";
import { RelativeOrientationSensor as RelativeOrientationSensorPolyfill } from "motion-sensors-polyfill";

declare global {
    interface Window {
        RelativeOrientationSensor?: any;
    }
}

export class RelativeOrientationSensorHelper extends AbstractOrientationSensorHelper {
    override async init(): Promise<void> {
        await super.init();
        this.sensor = new RelativeOrientationSensor({ frequency: 12 });
    }

    protected override setSensorPolyfill(): boolean {
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
