import * as THREE from 'three';

class ThreeRenderer {
    public scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.Renderer;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.init();
    }

    tick(delta: number) {
        this.renderer.render(this.scene, this.camera);
    }

    private init() {
        document.body.appendChild(this.renderer.domElement);
    }
}

export default new ThreeRenderer();



