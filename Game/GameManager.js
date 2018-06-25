import Vector2 from '/Utils/Vector2.js';
import Snake from '/Entities/Snake.js';
import Food from '/Entities/Food.js';

export default class GameManager {
    constructor(canvas, inputManager) {
        this.gridSize;
        this.canvas = canvas;
        this.snake;
        this.food;
        this.inputManager = inputManager;

        this.timer = 0;
        this.timeStep = 250;
    }

    setEntities(snake, food) {
        this.snake = snake;
        this.food = food;
    }

    setGridSize(size) {
        this.gridSize = size;
    }

    update(deltaTime) {
        this.timer = this.timer + (deltaTime || 0);

        if (this.timer > this.timeStep) {
            this.snake.move();
            
            this.timer -= this.timeStep;
        }        

        if(this.inputManager.isKeyPressed('a')) {
            this.snake.setDirection('left');
        }
        else if(this.inputManager.isKeyPressed('d')) {
            this.snake.setDirection('right');
        }
        else if(this.inputManager.isKeyPressed('w')) {
            this.snake.setDirection('up');
        }
        else if(this.inputManager.isKeyPressed('s')) {
            this.snake.setDirection('down');
        }

        this.checkBounds();
        this.checkFood();
    }

    newFoodPosition() {
        let ok = false;

        while (!ok) {
            this.food.position.copy(
                Vector2.random(
                    new Vector2(this.canvas.width, this.canvas.height),
                    this.gridSize));

            for (let i = 0; i < this.snake.body.length; i++) {
                if (this.snake.body[i].position.equals(this.food.position)) {
                    ok = false;
                    break;
                }
                else {
                    ok = true;
                }
            }
        }

        this.food.special = 'none';
    }

    checkBounds() {
        if (this.snake.crossedOver == false) {
            if (this.snake.position.x >= this.canvas.width) {
                this.snake.position.x = 0;
                this.snake.crossedOver = true;
            }
            else if (this.snake.position.x < 0) {
                this.snake.position.x = this.canvas.width - this.gridSize.x;
                this.snake.crossedOver = true;
            }
    
            if (this.snake.position.y >= this.canvas.height) {
                this.snake.position.y = 0;
                this.snake.crossedOver = true;
            }
            else if (this.snake.position.y < 0) {
                this.snake.position.y = this.canvas.height - this.gridSize.y;
                this.snake.crossedOver = true;
            }
        }
    }

    checkFood() {
        if (this.snake.position.equals(this.food.position)) {
            this.snake.eat(this.food);
            this.newFoodPosition();
        }
    }
}