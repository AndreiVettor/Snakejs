import Vector2 from '/Utils/Vector2.js';

export default class Renderer {
    constructor(document) {
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvasBackgroundColor = 'white';
    }

    drawRectangle(position, size, color = 'pink') {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(position.x, position.y, size.x, size.y);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    clearScreen() {
        this.drawRectangle(Vector2.zero(), new Vector2(this.canvas.width, this.canvas.height), this.canvasBackgroundColor);
    }
}