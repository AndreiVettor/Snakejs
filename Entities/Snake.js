import Vector2 from '/Utils/Vector2.js';

export default class Snake {
    constructor(position, size) {
        this.position = position;
        this.size = size;
        this.lastPosition = new Vector2(0, 0);

        this.direction = 'up';
        this.nextDirection = null;

        this.crossedOver = false;
        this.body = new Array();
        this.eaten = false;
        this.length = 0;
    }

    setDirection(direction) {

        let ok = false;

        if (this.direction == 'left' && direction != 'right') {
            ok = true;
        }
        else if (this.direction == 'right' && direction != 'left') {
            ok = true;
        }
        else if (this.direction == 'up' && direction != 'down') {
            ok = true;
        }
        else if (this.direction == 'down' && direction != 'up') {
            ok = true;
        }

        if (ok) {
            this.nextDirection = direction;
        }
        else {
            this.nextDirection = null;
        }
    }

    eat(food) {
        this.addBodyPart(food.position);
        this.eaten = true;
    }

    addBodyPart(position) {
        this.body.unshift({ position: position.clone() });
        this.length = this.body.length;
    }

    move() {

        if (this.nextDirection !== null) {
            this.direction = this.nextDirection;
        }        

        this.lastPosition.copy(this.position);

        switch (this.direction) {
            case 'up':
                this.position.y -= this.size.y;
                break;
            case 'down':
                this.position.y += this.size.y;
                break;
            case 'left':
                this.position.x -= this.size.x;
                break;
            case 'right':
                this.position.x += this.size.x;
                break;
            default:
                console.log('You are stupid');
                break;
        }

        if (this.eaten == false) {
            this.updateBody();
        }
        else {
            this.eaten = false;
        }
        this.crossedOver = false;
    }

    updateBody() {

        if (this.length > 0) {

            for (let index = this.length - 1; index > 0; --index) {
                this.body[index].position.copy(this.body[index - 1].position);
            }

            this.body[0].position.copy(this.lastPosition);
        }
    }

    draw(renderer) {

        // Draw body
        this.body.forEach(bodyPart => {
            renderer.drawRectangle(bodyPart.position, this.size, 'blue');
        });

        // Draw head
        renderer.drawRectangle(this.position, this.size, 'red');
    }
}