import { SensorNotFoundException } from "../../exception/SensorNotFoundException";
import { SensorNotGrantedException } from "../../exception/SensorNotGrantedException";
import { ISensor } from "../ISensor";

export abstract class AbstractSensor implements ISensor {
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
