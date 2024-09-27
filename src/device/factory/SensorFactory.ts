import { AbsoluteOrientation } from "../service/impl/AbsoluteOrientation";
import { ISensor } from "../service/ISensor";

export class SensorFactory {
    constructor() {}

    async getSensor(): Promise<ISensor> {
        const sensor = new AbsoluteOrientation();
        await sensor.init();
        return sensor;
    }
}
