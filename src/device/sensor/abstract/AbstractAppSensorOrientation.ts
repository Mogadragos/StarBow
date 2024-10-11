import { AbstractAppSensor } from "./AbstractAppSensor";

export abstract class AbstractAppSensorOrientation extends AbstractAppSensor {
    protected sensor!: OrientationSensor;

    set onReading(onReading: (data: number[]) => void) {
        this.sensor.onreading = () =>
            onReading(this.sensor.quaternion ? this.sensor.quaternion : []);
    }

    start(): void {
        this.sensor.start();
    }

    stop(): void {
        this.sensor.stop();
    }
}
