import Vector2 from '/Utils/Vector2.js';
import Snake from '/Entities/Snake.js';
import Renderer from '/Graphics/Renderer.js';
import Food from '/Entities/Food.js';
import GameManager from '/Game/GameManager.js';
import InputManager from '/Game/InputManager.js';

let renderer = new Renderer(document);
let inputManager = new InputManager(document);

let gameManager = new GameManager(renderer.canvas, inputManager);
gameManager.setGridSize(new Vector2(32, 32));

let snake = new Snake(new Vector2(
    gameManager.gridSize.x * 2,
    gameManager.gridSize.y * 2), gameManager.gridSize);
let food = new Food(new Vector2(
    gameManager.gridSize.x * 5,
    gameManager.gridSize.y * 5), gameManager.gridSize);

gameManager.setEntities(snake, food);


let currentTime, oldTime, deltaTime;

function gameLoop(elapsedTime) {
    currentTime = elapsedTime;
    deltaTime = currentTime - oldTime;    

    gameManager.update(deltaTime);

    renderer.clearScreen();
    food.draw(renderer);
    snake.draw(renderer);

    window.requestAnimationFrame(gameLoop);

    oldTime = currentTime;
}

window.requestAnimationFrame(gameLoop);