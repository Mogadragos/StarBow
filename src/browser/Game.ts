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
    WebGLRenderer,
} from "three";
import { LoaderHelper } from "./LoaderHelper";

export class Game {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;

    bow!: Object3D;
    gyroscope: { x: number; y: number; z: number };

    loader: LoaderHelper;
    debug: boolean;

    constructor(debug = true, cube = false) {
        this.gyroscope = { x: 0, y: 0, z: 0 };
        this.scene = new Scene();
        this.scene.background = new Color(0xe8e8e8);
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
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

        this.camera.position.z = 5;

        this.loader = new LoaderHelper();
    }

    async init(): Promise<void> {
        if (!this.bow) {
            const gltfData = await this.loader.load(
                "./3D/prototype_of_unnamed_smartphone/scene.gltf"
            );
            // Fix the rotation of the 3D Model
            gltfData.scene.children[0].rotation.z = (5 * Math.PI) / 36;
            this.bow = gltfData.scene as unknown as Object3D;
        }
        this.scene.add(this.bow);

        document.body.replaceChildren(this.renderer.domElement);

        if (this.debug) {
            const gui = new GUI();
            const ratio = Math.PI * 2;
            const gyroFolder = gui.addFolder("Gyroscope");
            gyroFolder.add(this.gyroscope, "x", 0, ratio).listen();
            gyroFolder.add(this.gyroscope, "y", 0, ratio).listen();
            gyroFolder.add(this.gyroscope, "z", 0, ratio).listen();
            gyroFolder.open();
            const bowFolder = gui.addFolder("Bow");
            bowFolder.add(this.bow.rotation, "x", 0, ratio).listen();
            bowFolder.add(this.bow.rotation, "y", 0, ratio).listen();
            bowFolder.add(this.bow.rotation, "z", 0, ratio).listen();
            bowFolder.open();
        }

        this.animate();
    }

    update(data: { x: number; y: number; z: number }): void {
        this.gyroscope.x = data.x;
        this.gyroscope.y = data.y;
        this.gyroscope.z = data.z;
    }

    animate(): void {
        requestAnimationFrame(() => this.animate());

        this.bow.rotation.x = this.gyroscope.x;
        this.bow.rotation.y = this.gyroscope.y;
        this.bow.rotation.z = this.gyroscope.z;

        this.renderer.render(this.scene, this.camera);
    }
}
