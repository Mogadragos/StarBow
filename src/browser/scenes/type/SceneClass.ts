import { IScene } from "../IScene";
import { SceneType } from "../enum/SceneType";
import { SharedData } from "./SharedData";

export type SceneClass = new (
    shared: SharedData,
    next: (sceneType: SceneType) => void,
) => IScene;
