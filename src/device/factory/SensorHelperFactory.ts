import { SensorType } from "../enum/SensorType";
import { ISensorHelper } from "../service/ISensorHelper";
import { AbsoluteOrientationSensorHelper } from "../service/impl/AbsoluteOrientationSensorHelper";
import { RelativeOrientationSensorHelper } from "../service/impl/RelativeOrientationSensorHelper";

export class SensorHelperFactory {
    constructor() {}

    async getSensorHelper(sensorType: SensorType): Promise<ISensorHelper> {
        let sensor;
        switch (sensorType) {
            case SensorType.AbsoluteOrientationSensor:
                sensor = new AbsoluteOrientationSensorHelper();
                break;
            case SensorType.RelativeOrientationSensor:
                sensor = new RelativeOrientationSensorHelper();
                break;
            default:
                throw new TypeError(sensorType + " is not a valid type");
        }
        await sensor.init();
        return sensor;
    }
}
