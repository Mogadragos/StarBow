// @ts-expect-error moduleResolution:nodenext issue 54523
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class LoaderHelper {
    loader: GLTFLoader;

    constructor() {
        this.loader = new GLTFLoader();
    }

    async load(path: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                path,
                (data) => resolve(data),
                this.onProgress,
                reject
            );
        });
    }

    onProgress(e: ProgressEvent<EventTarget>) {
        console.log((e.loaded / e.total) * 100 + "% loaded");
    }
}
