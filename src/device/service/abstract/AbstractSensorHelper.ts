import { SensorNotFoundException } from "../../exception/SensorNotFoundException";
import { SensorNotGrantedException } from "../../exception/SensorNotGrantedException";
import { ISensorHelper } from "../ISensorHelper";

export abstract class AbstractSensorHelper implements ISensorHelper {
    constructor() {
        if (!this.isPresent()) {
            throw new SensorNotFoundException();
        }
    }

    async init(): Promise<void> {
        if (!(await this.isPermissionGranted())) {
            throw new SensorNotGrantedException();
        }
    }

    abstract addReadingCallback(callback: (data: number[]) => void): void;
    abstract isPresent(): boolean;
    abstract isPermissionGranted(): Promise<boolean>;
    abstract start(): void;
    abstract stop(): void;
}
