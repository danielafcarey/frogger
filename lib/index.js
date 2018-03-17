const Game = require('./Game.js');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let game

function initializeGame() {
  game = new Game();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.drawObjects(ctx);
  game.animateObstacles();
  requestAnimationFrame(gameLoop);
}

initializeGame();
gameLoop();

window.addEventListener('keydown', function(event) {
  event.preventDefault();
  game.controlFrog(event.keyCode, canvas.width, canvas.height);
})


