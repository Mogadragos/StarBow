import { SharedData } from "../type/SharedData";
import { AbstractScene } from "./AbstractScene";

export abstract class AbstractSceneWithDOM extends AbstractScene {
    DOM: HTMLDivElement;

    constructor(shared: SharedData) {
        super(shared);
        this.DOM = document.createElement("div");
        document.body.appendChild(this.DOM);
    }

    override delete(): void {
        this.DOM.remove();
    }
}
