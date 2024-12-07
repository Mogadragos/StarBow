import { IAppSensor } from "../IAppSensor";
import { SensorNotFoundException } from "../exception/SensorNotFoundException";
import { SensorNotGrantedException } from "../exception/SensorNotGrantedException";

export abstract class AbstractAppSensor implements IAppSensor {
    protected abstract isPresent(): boolean;
    protected abstract isPermissionGranted(): Promise<boolean>;
    protected abstract setPolyfill(): boolean;

    abstract start(): void;
    abstract stop(): void;

    constructor() {
        if (!this.isPresent() && !this.setPolyfill()) {
            throw new SensorNotFoundException();
        }
    }

    async init(_frequency: number): Promise<void> {
        if (!(await this.isPermissionGranted())) {
            throw new SensorNotGrantedException();
        }
    }
}
