const Obstacle = require('../lib/Obstacle.js')

class Car extends Obstacle {
  constructor(x, y, width, height, velocity) {
    super(x, width, height)
    this.type = 'car'
    this.y = y;
    this.velocity = velocity;
    this.fillStyle = 'red';
  }
}


module.exports = Car;
