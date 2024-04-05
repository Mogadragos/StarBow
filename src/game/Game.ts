import {
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
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  init() {
    document.body.replaceChildren(this.renderer.domElement);
    this.animate();
  }

  update(data: { x: number; y: number; z: number }) {
    this.gyroscope = data;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.cube.rotation.x += this.gyroscope.x / 50;
    this.cube.rotation.y += this.gyroscope.y / 50;
    this.cube.rotation.z += this.gyroscope.z / 50;

    this.renderer.render(this.scene, this.camera);
  }
}
