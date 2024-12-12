// @ts-expect-error moduleResolution:nodenext issue 54523
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class LoaderHelper {
    loader: GLTFLoader;

    constructor() {
        this.loader = new GLTFLoader();
    }

    async loadGLTF(path: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            this.loader.load(path, resolve, this.onProgress, reject);
        });
    }

    async loadImage(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onprogress = this.onProgress;
            image.onerror = reject;
            image.src = path;
        });
    }

    onProgress(e: ProgressEvent<EventTarget>) {
        // TODO: Add progress bar or animation
        console.log((e.loaded / e.total) * 100 + "% loaded");
    }
}
