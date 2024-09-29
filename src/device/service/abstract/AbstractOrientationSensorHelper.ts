import { AbstractSensorHelper } from "./AbstractSensorHelper";

export abstract class AbstractOrientationSensorHelper extends AbstractSensorHelper {
    protected sensor!: OrientationSensor;

    addReadingCallback(callback: (data: number[]) => void): void {
        this.sensor.addEventListener("reading", () =>
            callback(this.sensor.quaternion ? this.sensor.quaternion : []),
        );
    }

    start(): void {
        this.sensor.start();
    }

    stop(): void {
        this.sensor.stop();
    }
}
