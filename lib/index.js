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

window.addEventListener('keydown', event => {
  event.preventDefault();
  game.controlFrog(event.keyCode, canvas.width, canvas.height);
})

document.querySelector('.new-game').addEventListener('click', event => {
  initializeGame();
  gameLoop();
  document.querySelector('.start-screen').classList.add('hide');
  event.target.classList.add('hide');
  document.querySelector('.game-stats').classList.remove('hide');
})


