import { IScene } from "../IScene";
import { SharedData } from "../type/SharedData";

export abstract class AbstractScene implements IScene {
    shared: SharedData;

    constructor(shared: SharedData) {
        this.shared = shared;
    }

    delete(): void {}

    abstract load(): Promise<void>;
}
