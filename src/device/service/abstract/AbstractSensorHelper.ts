import { SensorNotFoundException } from "../../exception/SensorNotFoundException";
import { SensorNotGrantedException } from "../../exception/SensorNotGrantedException";
import { ISensorHelper } from "../ISensorHelper";

export abstract class AbstractSensorHelper implements ISensorHelper {
    constructor() {
        if (!this.isPresent() && !this.setSensorPolyfill()) {
            throw new SensorNotFoundException();
        }
    }

    async init(): Promise<void> {
        if (!(await this.isPermissionGranted())) {
            throw new SensorNotGrantedException();
        }
    }

    protected abstract setSensorPolyfill(): boolean;

    protected abstract isPresent(): boolean;
    protected abstract isPermissionGranted(): Promise<boolean>;

    abstract addReadingCallback(callback: (data: number[]) => void): void;
    abstract start(): void;
    abstract stop(): void;
}
