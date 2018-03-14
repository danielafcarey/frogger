const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const Game = require('./Game.js')


function gameLoop() {
  var game = new Game(canvas, ctx);
  requestAnimationFrame(gameLoop)
  game.getFrog();

}

gameLoop();


