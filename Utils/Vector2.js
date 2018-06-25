export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static zero() {
        return new Vector2(0, 0);
    }

    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    equals(vector) {
        return this.x == vector.x && this.y == vector.y;
    }

    static random(max, gridSize) {
        return new Vector2(
            Math.trunc(max.x * Math.random() / gridSize.x) * gridSize.x,
            Math.trunc(max.y * Math.random() / gridSize.y) * gridSize.y);
    }
}