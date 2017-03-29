import Input from './input';
import Render from './render';
import * as THREE from 'three';
import db from './db';

const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const geometry = new THREE.BoxGeometry(20, 20, 20);

export default class Player {
    public position: number[];
    public curve: number[];
    public local: boolean;
    public id: string;

    private o3d: THREE.Object3D;
    private lastMove: number;

    constructor(local: boolean, id?: string) {
        this.local = local;
        // maybe better in the f~~uture
        this.id = id || Date.now().toString();
        this.position = [0, 0, 0];

        if (local) {
            db.ref(`player/${this.id}`).onDisconnect().remove();
        }
    }

    tick(delta: number) {
        this.classicTick(delta);
    }

    curveTick(delta: number) {
        if (Input.keys.w) {
            this.position[1]++;
        } else if (Input.keys.s) {
            this.position[1]--;
        }

        if (Input.keys.a) {
            this.position[0]--;
        } else if (Input.keys.d) {
            this.position[0]++;
        }
    }

    classicTick(delta: number) {
        if (Input.keys.w) {
            this.position[1]++;
        } else if (Input.keys.s) {
            this.position[1]--;
        }

        if (Input.keys.a) {
            this.position[0]--;
        } else if (Input.keys.d) {
            this.position[0]++;
        }

        db.ref(`player/${this.id}`).set({
            id: this.id,
            position: this.position
        });
    }

    update(data: any) {
        if (this.position.some((pos, i) => pos !== data.position[i])) {
            this.lastMove = 0;
        }
        this.position = data.position;
    }

    render(delta: number) {
        if (!this.o3d) {
            this.o3d = new THREE.Mesh(geometry, material);
            Render.scene.add(this.o3d);
        }

        const dest = new THREE.Vector3();
        dest.fromArray(this.position);
        
        if (!this.local) {
            this.lastMove += delta * 0.01;
            if (this.lastMove < 1) {
                this.o3d.position.lerp(dest, this.lastMove);
            }
        } else {
            this.o3d.position.fromArray(this.position);
        }
    }
}