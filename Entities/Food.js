import Vector2 from '/Utils/Vector2.js';

export default class Food {
    constructor(position, size) {
        this.position = position;
        this.special = 'none';
        this.size = size;
    }

    draw(renderer) {
        renderer.drawRectangle(this.position, this.size, 'green');
    }
}