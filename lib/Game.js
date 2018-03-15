const Frog = require('./Frog.js')
  
class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.frogger = new Frog(this.ctx)
  }

  drawObjects() {
    this.frogger.drawFrog();
  }

  controlFrog(keycode) {
    if (keycode === 38) {
      this.frogger.moveFrogUp()
    } else if (keycode === 40) {
      this.frogger.moveFrogDown()
    } else if (keycode === 39) {
      this.frogger.moveFrogRight()
    } else if (keycode === 37) {
      this.frogger.moveFrogLeft()
    }
  }
}




module.exports = Game;