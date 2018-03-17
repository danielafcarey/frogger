const Frog = require('./Frog.js')
const Obstacle = require('./Obstacle.js')
const Car = require('./Car.js')
  
class Game {
  constructor() {
    this.frogger = new Frog()
    this.carLane1 = new Car(0, 550, this.width, this.height, 1);
  }

  drawObjects(ctx) {
    this.frogger.drawFrog(ctx);
    this.carLane1.drawSelf(ctx, this.carLane1.fillStyle);

  }

  controlFrog(keycode, canvasWidth, canvasHeight) {
    if (keycode === 38 && !(this.frogger.y === 0)) {
      this.frogger.moveFrogUp()
    } else if (keycode === 40 && !(this.frogger.y === canvasHeight - this.frogger.height)) {
      this.frogger.moveFrogDown()
    } else if (keycode === 39 && !(this.frogger.x === canvasWidth - this.frogger.width)) {
      this.frogger.moveFrogRight()
    } else if (keycode === 37 && !(this.frogger.x === 0)) {
      this.frogger.moveFrogLeft()
    }
  }
}




module.exports = Game;