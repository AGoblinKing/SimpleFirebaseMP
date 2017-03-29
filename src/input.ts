class Input {
    public keys: {[key: string]: boolean};

    constructor() {
        this.keys = {};
        document.body.addEventListener('keydown', this.onKeyDown.bind(this));
        document.body.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(e: KeyboardEvent) {
        this.keys[e.key] = true;
    }

    onKeyUp(e: KeyboardEvent) {
        this.keys[e.key] = false;
    }
}

export default new Input();
