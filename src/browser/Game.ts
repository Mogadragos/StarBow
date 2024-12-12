import { IAppPeerHost } from "../shared/peer/IAppPeerHost";
import { LoaderHelper } from "./LoaderHelper";
import { IScene } from "./scenes/IScene";
import { SceneType } from "./scenes/enum/SceneType";
import { CalibrationScene } from "./scenes/impl/CalibrationScene";
import { ConnexionScene } from "./scenes/impl/ConnexionScene";
import { GameScene } from "./scenes/impl/GameScene";
import { SceneClass } from "./scenes/type/SceneClass";
import { SharedData } from "./scenes/type/SharedData";

export class Game {
    debug: boolean;

    scenes: { [key in SceneType]: SceneClass };
    shared: SharedData;
    currentScene!: IScene;

    constructor(debug = true) {
        this.debug = debug;

        this.shared = { loader: new LoaderHelper() };

        this.scenes = {
            [SceneType.CALIBRATION]: CalibrationScene,
            [SceneType.CONNEXION]: ConnexionScene,
            [SceneType.GAME]: GameScene,
        };

        this.loadScene(SceneType.CONNEXION);
    }

    nextScene(sceneType: SceneType) {
        this.currentScene.delete();
        this.loadScene(sceneType);
    }

    async loadScene(sceneType: SceneType) {
        this.currentScene = new this.scenes[sceneType](
            this.shared,
            this.nextScene.bind(this),
        );
        await this.currentScene.load();
    }
}
