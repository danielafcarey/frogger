const Frog = require('./Frog.js')
const Obstacle = require('./Obstacle.js')
const Car = require('./Car.js')
  
class Game {
  constructor() {
    this.frogger = new Frog()
    this.carLane1a = new Car(0, 550, this.width, this.height, 2);
    this.carLane1b = new Car(150, 550, this.width, this.height, 2);
    this.carLane2a = new Car(525, 500, this.width, this.height, -2);
  }

  drawObjects(ctx) {
    this.frogger.drawFrog(ctx);
    this.carLane1a.drawSelf(ctx, this.carLane1a.fillStyle);
    this.carLane1b.drawSelf(ctx, this.carLane1b.fillStyle);
    this.carLane2a.drawSelf(ctx, this.carLane1b.fillStyle);
  }

  animateObstacles() {
    this.carLane1a.moveObstacles();
    this.carLane1b.moveObstacles();
    this.carLane2a.moveObstacles();
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