const Obstacle = require('../lib/Obstacle.js')

class Car extends Obstacle {
  constructor(x, y, velocity) {
    super(x, y, velocity);
    this.type = 'car';
    this.width = 50;
  }
}


module.exports = Car;
