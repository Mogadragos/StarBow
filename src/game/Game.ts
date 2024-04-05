import {
  AxesHelper,
  BoxGeometry,
  Camera,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export class Game {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;

  cube: Mesh;

  gyroscope: { x: number; y: number; z: number };

  constructor() {
    this.gyroscope = { x: 0, y: 0, z: 0 };
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new BoxGeometry(1, 1, 1);
    this.cube = new Mesh(geometry, [
      new MeshBasicMaterial({ color: 0xff0000 }),
      new MeshBasicMaterial({ color: 0xff0000 }),
      new MeshBasicMaterial({ color: 0x00ff00 }),
      new MeshBasicMaterial({ color: 0x00ff00 }),
      new MeshBasicMaterial({ color: 0x0000ff }),
      new MeshBasicMaterial({ color: 0x0000ff }),
    ]);
    this.scene.add(this.cube);

    const axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);

    this.camera.position.z = 5;
  }

  init(): void {
    document.body.replaceChildren(this.renderer.domElement);
    this.animate();
  }

  update(data: { x: number; y: number; z: number }): void {
    this.gyroscope = data;
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    this.cube.rotation.x = this.gyroscope.x;
    this.cube.rotation.y = this.gyroscope.y;
    this.cube.rotation.z = this.gyroscope.z;

    this.renderer.render(this.scene, this.camera);
  }
}
