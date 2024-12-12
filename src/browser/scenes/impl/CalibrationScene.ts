import { AbstractSceneWithDOM } from "../abstract/AbstractSceneWithDOM";
import { SceneType } from "../enum/SceneType";
import { SharedData } from "../type/SharedData";

export class CalibrationScene extends AbstractSceneWithDOM {
    timeout?: ReturnType<typeof setTimeout>;
    constructor(shared: SharedData, next: (sceneType: SceneType) => void) {
        super(shared);

        this.shared.peer!.onData = function (_data) {
            next(SceneType.GAME);
        };
    }

    override async load(): Promise<void> {
        const btn = document.createElement("button");
        btn.innerHTML = "Click me when ready";
        btn.addEventListener(
            "click",
            () => {
                this.shared.peer!.send("ready");
                // TODO : Add animations
                this.timeout = setTimeout(() => {
                    this.shared.peer!.disconnect(
                        "Technical error, can't get your device's data",
                    );
                }, 5000);
            },
            { once: true },
        );

        const img = await this.shared.loader.loadImage("./phone_keyboard.png");
        img.style.width = "100%";
        this.DOM.appendChild(btn);
        this.DOM.appendChild(img);
    }

    override delete(): void {
        super.delete();
        clearTimeout(this.timeout);
        this.shared.peer!.onData = undefined;
    }
}
