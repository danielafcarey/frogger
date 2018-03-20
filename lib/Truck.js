const Obstacle = require('../lib/Obstacle.js')

class Truck extends Obstacle {
  constructor(x, y, velocity) {
    super(x, y, velocity);
    this.type = 'truck';
    this.width = 150;
  }
}


module.exports = Truck;