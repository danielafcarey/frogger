const Obstacle = require('../lib/Obstacle.js')

class Car extends Obstacle {
  constructor(x, y, height, velocity) {
    super(height);
    this.type = 'car';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.velocity = velocity;
    this.fillStyle = 'red';
  }

}


module.exports = Car;
