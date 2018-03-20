const Obstacle = require('../lib/Obstacle.js')

class Car2 extends Obstacle {
  constructor(x, y, height, velocity) {
    super(height);
    this.type = 'car2';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.velocity = velocity;
  }
}


module.exports = Car2;