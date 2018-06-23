let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext('2d');

let gridSize = 32;
let fps = 60;

let screenWidth = canvas.width;
let screenHeight = canvas.height;

let delta;
let timer = 0;
let time, oldTime = Date.now(0);
let timeStep = 250;

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
}

class Food {
    constructor(position) {
        this.position = position;
        this.special = 'none';
    }

    generateNewPosition(snake) {
        let ok = false;

        while (!ok) {

            this.position.copy(getRandomPosition());

            for (let i = 0; i < snake.body.length; i++) {
                if (snake.body[i].position.equals(food.position)) {
                    ok = false;
                    break;
                }
                else {
                    ok = true;
                }
            }
        }

        this.special = 'none';
    }

    draw(ctx) {
        drawRectangle(ctx, this.position, 'green');
    }
}

class Snake {
    constructor(position) {
        this.position = position;
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
        this.body.unshift({position: position.clone()});
        this.length = this.body.length;
    }

    move() {

        if (this.nextDirection !== null) {
            this.direction = this.nextDirection;
        }

        this.lastPosition.copy(this.position);

        switch (this.direction) {
            case 'up':
                this.position.y -= gridSize;
                break;
            case 'down':
                this.position.y += gridSize;
                break;
            case 'left':
                this.position.x -= gridSize;
                break;
            case 'right':
                this.position.x += gridSize;
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

    draw(ctx) {

        // Draw body
        this.body.forEach(bodyPart => {
            drawRectangle(ctx, bodyPart.position, 'blue');
        });

        // Draw head
        drawRectangle(ctx, this.position, 'red');
    }
}

function drawRectangle(ctx, position, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(position.x, position.y, gridSize, gridSize);
    ctx.fill();
    ctx.closePath();
}

function clearScreen(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkFood(snake, food) {
    if (snake.position.equals(food.position)) {
        snake.eat(food);
        food.generateNewPosition(snake);
    }
}

function getRandomPosition() {
    return new Vector2(
        Math.trunc(screenWidth * Math.random() / gridSize) * gridSize,
        Math.trunc(screenHeight * Math.random() / gridSize) * gridSize);
}

function checkBounds(snake) {
    if (snake.crossedOver == false) {
        if (snake.position.x >= canvas.width) {
            snake.position.x = 0;
            snake.crossedOver = true;
        }
        else if (snake.position.x < 0) {
            snake.position.x = canvas.width - gridSize;
            snake.crossedOver = true;
        }

        if (snake.position.y >= canvas.height) {
            snake.position.y = 0;
            snake.crossedOver = true;
        }
        else if (snake.position.y < 0) {
            snake.position.y = canvas.height - gridSize;
            snake.crossedOver = true;
        }
    }
}

function gameLoop() {

    // Time delta

    time = Date.now();
    delta = time - oldTime;


    // Timer mechanic

    timer = timer + delta;
    if (timer > timeStep) {
        snake.move();
        timer -= timeStep;
    }


    // Game mechanics checks

    checkBounds(snake);
    checkFood(snake, food);


    // Draw

    clearScreen(ctx, canvas);
    food.draw(ctx);
    snake.draw(ctx);

    oldTime = time;
}


// Input mapping
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName == 'ArrowRight' || keyName == 'd') {
        snake.setDirection('right');
    }
    else if (keyName == 'ArrowLeft' || keyName == 'a') {
        snake.setDirection('left');
    }
    else if (keyName == 'ArrowUp' || keyName == 'w') {
        snake.setDirection('up');
    }
    else if (keyName == 'ArrowDown' || keyName == 's') {
        snake.setDirection('down');
    }
});

let snake = new Snake(new Vector2(gridSize * 2, gridSize * 2));
let food = new Food(new Vector2(gridSize * 5, gridSize * 5));

(function () {
    setInterval(gameLoop, 1000 / fps);
})();