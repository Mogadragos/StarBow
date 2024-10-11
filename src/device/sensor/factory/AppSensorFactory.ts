import { IAppSensor } from "../IAppSensor";
import { SensorType } from "../enum/SensorType";
import { AppSensorAbsoluteOrientation } from "../impl/AppSensorAbsoluteOrientation";
import { AppSensorRelativeOrientation } from "../impl/AppSensorRelativeOrientation";

export class AppSensorFactory {
    constructor() {}

    async createSensor(sensorType: SensorType): Promise<IAppSensor> {
        let sensor: IAppSensor;
        switch (sensorType) {
            case SensorType.AbsoluteOrientation:
                sensor = new AppSensorAbsoluteOrientation();
                break;
            case SensorType.RelativeOrientation:
                sensor = new AppSensorRelativeOrientation();
                break;
            default:
                throw new TypeError(sensorType + " is not a valid type");
        }
        await sensor.init();
        return sensor;
    }
}
