import { AbstractAppSensorOrientation } from "../abstract/AbstractAppSensorOrientation";
import { AbsoluteOrientationSensor as AbsoluteOrientationSensorPolyfill } from "motion-sensors-polyfill";

declare global {
    interface Window {
        AbsoluteOrientationSensor?: any;
    }
}

export class AppSensorAbsoluteOrientation extends AbstractAppSensorOrientation {
    override async init(): Promise<void> {
        await super.init();
        this.sensor = new AbsoluteOrientationSensor({ frequency: 12 });
    }

    override setPolyfill(): boolean {
        window.AbsoluteOrientationSensor = AbsoluteOrientationSensorPolyfill;
        return true;
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
            results.every((result) => result.state === "granted"),
        );
    }
}
