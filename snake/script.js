const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const size = 20;
const cols = canvas.width / size;
const rows = canvas.height / size;

let snake = [{ x: 10, y: 10 }];
let dir = { x: 1, y: 0 };
let nextDir = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = parseInt(localStorage.getItem("snakeHigh") || "0", 10);
let saved = false;
let paused = false;
let alive = true;

function placeFood() {
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    if (snake.some(s => s.x === food.x && s.y === food.y)) placeFood();
}

function update() {
    if (!alive) return;
    if (paused) return;
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) { alive = false; return; }
    if (snake.some(s => s.x === head.x && s.y === head.y)) { alive = false; return; }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * size, food.y * size, size, size);
    ctx.fillStyle = "#2ecc71";
    snake.forEach(s => ctx.fillRect(s.x * size + 1, s.y * size + 1, size - 2, size - 2));
    if (paused) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
    }
    if (!alive) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        if (!saved) { if (score > highScore) { highScore = score; localStorage.setItem("snakeHigh", highScore); document.getElementById("high").textContent = highScore; } saved = true; }
    }
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dir.y === 0) nextDir = { x: 0, y: -1 };
    else if (e.key === "ArrowDown" && dir.y === 0) nextDir = { x: 0, y: 1 };
    else if (e.key === "ArrowLeft" && dir.x === 0) nextDir = { x: -1, y: 0 };
    else if (e.key === "ArrowRight" && dir.x === 0) nextDir = { x: 1, y: 0 };
    else if (e.key === "p" || e.key === "P") paused = !paused;
});

setInterval(() => { update(); draw(); }, 100);
draw();

document.getElementById("high").textContent = highScore;
