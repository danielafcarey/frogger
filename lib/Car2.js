const Obstacle = require('../lib/Obstacle.js')

class Car2 extends Obstacle {
  constructor(x, y, velocity) {
    super(x, y, velocity);
    this.type = 'car2';
    this.width = 50;
  }
}


module.exports = Car2;