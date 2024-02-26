const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20
const width = canvas.width / boxSize
const height = canvas.height / boxSize

let snake = []
snake[0] = { x: width / 2, y: height / 2 }

let direction = "right"
let score = 0

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height)

for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "black"
    ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize)

    ctx.strokeStyle = "white"
    ctx.strokeRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize)
}

ctx.fillStyle = "white"
ctx.font = "20px Arial"
ctx.fillText("Score: " + score, 10, 30)

let snakeX = snake[0].x
let snakeY = snake[0].y

if (direction === "right") snakeX++
if (direction === "left") snakeX--
if (direction === "up") snakeY--
if (direction === "down") snakeY++

if (snakeX * boxSize === canvas.width ||
    snakeY * boxSize === canvas.height ||
    snakeX * boxSize < 0 ||
    snakeY * boxSize < 0 ||
    collision(snakeX, snakeY)) {
    gameOver()
}

if (snakeX * boxSize === foodX * boxSize && snakeY * boxSize === foodY * boxSize) {
    score++
    foodX = Math.floor(Math.random() * width)
    foodY = Math.floor(Math.random() * height)
} else {
    snake.pop()
}

let newHead = {
    x: snakeX,
    y: snakeY
}

snake.unshift(newHead)

ctx.fillStyle = "red"
ctx.fillRect(foodX * boxSize, foodY * boxSize, boxSize, boxSize)
}

function collision(x, y) {
for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
        return true
    }
}
return false
}

let foodX = Math.floor(Math.random() * width)
let foodY = Math.floor(Math.random() * height)

const game = setInterval(draw, 150)

function gameOver() {
clearInterval(game)
document.getElementById("gameOverText").style.display = "block"
document.getElementById("restartButton").style.display = "block"
canvas.style.filter = "blur(5px)"
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        location.reload()
    }
})
}

function restartGame() {
location.reload()
}

document.getElementById("restartButton").addEventListener("click", restartGame)

function keyDown(e) {
if (e.keyCode === 37 && direction !== "right") {
    direction = "left"
} else if (e.keyCode === 38 && direction !== "down") {
    direction = "up"
} else if (e.keyCode === 39 && direction !== "left") {
    direction = "right"
} else if (e.keyCode === 40 && direction !== "up") {
    direction = "down"
}
}

document.addEventListener("keydown", keyDown, false)