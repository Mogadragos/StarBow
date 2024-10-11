import { AbstractAppSensor } from "./AbstractAppSensor";

export abstract class AbstractAppSensorOrientation extends AbstractAppSensor {
    protected sensor!: OrientationSensor;

    start(): void {
        this.sensor.start();
    }

    stop(): void {
        this.sensor.stop();
    }
}
