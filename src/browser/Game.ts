import { LoaderHelper } from "./LoaderHelper";
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

export class Game {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;

    bow!: Object3D;

    loader: LoaderHelper;
    debug: boolean;

    constructor(debug = true, cube = false) {
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

        if (cube) {
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

        this.debug = debug;
        if (debug) {
            const axesHelper = new AxesHelper(5);
            this.scene.add(axesHelper);
        }

        this.camera.position.z = -5;
        this.camera.lookAt(new Vector3());

        this.loader = new LoaderHelper();
    }

    async init(): Promise<void> {
        if (!this.bow) {
            const gltfData = await this.loader.load(
                "./3D/prototype_of_unnamed_smartphone/scene.gltf",
            );
            // Fix the rotation of the 3D Model
            gltfData.scene.children[0].rotation.z = (5 * Math.PI) / 36;
            this.bow = gltfData.scene as unknown as Object3D;
        }
        this.scene.add(this.bow);

        document.body.replaceChildren(this.renderer.domElement);

        if (this.debug) {
            const gui = new GUI();
            const gyroFolder = gui.addFolder("Bow");
            gyroFolder.add(this.bow.quaternion, "x", -1, 1).listen();
            gyroFolder.add(this.bow.quaternion, "y", -1, 1).listen();
            gyroFolder.add(this.bow.quaternion, "z", -1, 1).listen();
            gyroFolder.add(this.bow.quaternion, "w", -1, 1).listen();
            gyroFolder.open();
        }

        this.animate();
    }

    update(data: number[]): void {
        this.bow.quaternion.fromArray(data).invert();
    }

    animate(): void {
        requestAnimationFrame(() => this.animate());

        this.renderer.render(this.scene, this.camera);
    }
}
