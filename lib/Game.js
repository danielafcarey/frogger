const Frog = require('./Frog.js')
  
class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.frogger = new Frog(this.ctx)
  }

  drawObjects() {
    this.frogger.drawFrog();
  }

  controlFrog(keycode, canvas) {
    // if (this.frogger.x === canvas.width - this.frogger.width || 
    //     this.frogger.x === 0 ||
    //     this.frogger.y === canvas.height - this.frogger.height ||
    //     this.frogger.y === 0) {
    //   return
    // }

    if (keycode === 38 && !(this.frogger.y === 0)) {
      this.frogger.moveFrogUp()
    } else if (keycode === 40 && !(this.frogger.y === canvas.height - this.frogger.height)) {
      this.frogger.moveFrogDown()
    } else if (keycode === 39 && !(this.frogger.x === canvas.width - this.frogger.width)) {
      this.frogger.moveFrogRight()
    } else if (keycode === 37 && !(this.frogger.x === 0)) {
      this.frogger.moveFrogLeft()
    }
  }
}




module.exports = Game;