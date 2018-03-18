const Frog = require('./Frog.js')
const Obstacle = require('./Obstacle.js')
const Car = require('./Car.js')
const Truck = require('./Truck.js')
const Log = require('./Log.js')
const Turtle = require('./Turtle.js')
  
class Game {
  constructor() {
    this.lane1 = 550;
    this.lane2 = 500;
    this.lane3 = 450;
    this.lane4 = 400;
    this.lane5 = 350;
    this.lane6 = 300;
    this.lane7 = 250;
    this.lane8 = 200;
    this.lane9 = 150;
    this.lane10 = 100;
    this.lane11 = 50;
    this.lane12 = 0;

    this.frogger = new Frog()
    this.obstaclesArray = [];
    this.createObstacles();
    this.lives = 3;
    this.score = 0;
    
  }

  createObstacles() {
    this.obstaclesArray.push(new Car(0, this.lane1, this.width, this.height, 2));
    this.obstaclesArray.push(new Car(150, this.lane1, this.width, this.height, 2));
    this.obstaclesArray.push(new Car(525, this.lane2, this.width, this.height, -3));
    this.obstaclesArray.push(new Car(375, this.lane2, this.width, this.height, -3));
    this.obstaclesArray.push(new Car(225, this.lane2, this.width, this.height, -3))
    this.obstaclesArray.push(new Truck(250, this.lane3, this.width, this.height, 1.25))
    this.obstaclesArray.push(new Car(225, this.lane4, this.width, this.height, -6))
    this.obstaclesArray.push(new Car(375, this.lane4, this.width, this.height, -6))
    this.obstaclesArray.push(new Truck(400, this.lane5, this.width, this.height, 1.5))
    this.obstaclesArray.push(new Truck(125, this.lane5, this.width, this.height, 1.5))
    this.obstaclesArray.push(new Log(300, this.lane7, this.width, this.height, -2))
    this.obstaclesArray.push(new Turtle(325, this.lane8, this.width, this.height, 2.5))
    this.obstaclesArray.push(new Turtle(375, this.lane8, this.width, this.height, 2.5))
    this.obstaclesArray.push(new Turtle(150, this.lane8, this.width, this.height, 2.5))
    this.obstaclesArray.push(new Turtle(100, this.lane8, this.width, this.height, 2.5))
    this.obstaclesArray.push(new Log(400, this.lane9, this.width, this.height, -1))
    this.obstaclesArray.push(new Log(100, this.lane9, this.width, this.height, -1))
    this.obstaclesArray.push(new Turtle(100, this.lane10, this.width, this.height, 4.5))
    this.obstaclesArray.push(new Turtle(150, this.lane10, this.width, this.height, 4.5))
    this.obstaclesArray.push(new Turtle(200, this.lane10, this.width, this.height, 4.5))
    this.obstaclesArray.push(new Log(425, this.lane11, this.width, this.height, -.5))
    this.obstaclesArray.push(new Log(175, this.lane11, this.width, this.height, -.5))
  }

  drawObjects(ctx) {
    this.frogger.drawFrog(ctx);
    this.obstaclesArray.forEach(function(obstacle) {
      obstacle.drawSelf(ctx, obstacle.fillStyle)
    })
  }

  animateObstacles() {
    this.obstaclesArray.forEach(function(obstacle) {
      obstacle.moveObstacles();
    })
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