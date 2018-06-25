export default class InputManager {
    constructor(document) {
        this.keyMap = {};

        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
        
            this.initKey(keyName);
            this.keyMap[keyName].down = true;
        });

        document.addEventListener('keypressed', (event) => {
            const keyName = event.key;
        
            this.initKey(keyName);
            this.keyMap[keyName].pressed = true;
        });

        document.addEventListener('keyup', (event) => {
            const keyName = event.key;
        
            this.initKey(keyName);
            this.keyMap[keyName].down = false;
            this.keyMap[keyName].pressed = false;
        });
    }

    initKey(keyName) {
        if(this.keyMap[keyName] == undefined)
            {
                this.keyMap[keyName] = {};
            }
    }

    isKeyDown(key) {
        if(this.keyMap[key] != undefined && this.keyMap[key].down)
            return true;
    }

    isKeyPressed(key) {
        if(this.keyMap[key] != undefined && this.keyMap[key].down)
            return true;
    }
}