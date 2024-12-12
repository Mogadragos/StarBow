import { Config } from "../../../shared/Config";
import { LoaderHelper } from "../../LoaderHelper";
import { IScene } from "../IScene";
import { AbstractScene } from "../abstract/AbstractScene";
import { SceneType } from "../enum/SceneType";
import { SharedData } from "../type/SharedData";
import { GUI } from "dat.gui";
import {
    AxesHelper,
    BoxGeometry,
    Camera,
    Color,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
} from "three";

export class GameScene extends AbstractScene {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;

    bow!: Object3D;

    constructor(shared: SharedData, next: (sceneType: SceneType) => void) {
        super(shared);

        this.scene = new Scene();
        this.scene.background = new Color(0xe8e8e8);
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (Config.DEVMODE) {
            const geometry = new BoxGeometry(1, 1, 1);
            this.bow = new Mesh(geometry, [
                new MeshBasicMaterial({ color: 0xff0000 }),
                new MeshBasicMaterial({ color: 0xff0000 }),
                new MeshBasicMaterial({ color: 0x00ff00 }),
                new MeshBasicMaterial({ color: 0x00ff00 }),
                new MeshBasicMaterial({ color: 0x0000ff }),
                new MeshBasicMaterial({ color: 0x0000ff }),
            ]);
        }

        if (Config.DEVMODE) {
            const axesHelper = new AxesHelper(5);
            this.scene.add(axesHelper);
        }

        this.camera.position.z = -5;
        this.camera.lookAt(new Vector3());
    }

    override async load(): Promise<void> {
        if (!this.bow) {
            const gltfData = await this.shared.loader.loadGLTF(
                "./3D/prototype_of_unnamed_smartphone/scene.gltf",
            );
            // Fix the rotation of the 3D Model
            gltfData.scene.children[0].rotation.x = Math.PI;
            gltfData.scene.children[0].rotation.y = Math.PI;
            gltfData.scene.children[0].rotation.z = (5 * Math.PI) / 36;
            this.bow = gltfData.scene as unknown as Object3D;
        }
        this.scene.add(this.bow);

        document.body.appendChild(this.renderer.domElement);

        if (Config.DEVMODE) {
            const gui = new GUI();
            const gyroFolder = gui.addFolder("Bow");
            gyroFolder
                .add(this.bow.rotation, "x", 0.0, 2 * Math.PI, 0.1)
                .listen();
            gyroFolder
                .add(this.bow.rotation, "y", 0.0, 2 * Math.PI, 0.1)
                .listen();
            gyroFolder
                .add(this.bow.rotation, "z", 0.0, 2 * Math.PI, 0.1)
                .listen();
            gyroFolder.open();
        }

        this.animate();

        this.shared.peer!.onData = (data) => this.update(data as number[]);
    }

    update(data: number[]): void {
        this.bow.quaternion.fromArray(data).invert();
    }

    animate(): void {
        requestAnimationFrame(() => this.animate());

        this.renderer.render(this.scene, this.camera);
    }
}
