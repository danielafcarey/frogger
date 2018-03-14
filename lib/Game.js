const Frog = require('./Frog.js')
  
class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  getFrog() {
    var frogger = new Frog(this.ctx)
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.move()
    frogger.drawFrog();

  }
}



module.exports = Game;