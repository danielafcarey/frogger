const Obstacle = require('../lib/Obstacle.js')

class Truck extends Obstacle {
  constructor(x, y, height, velocity) {
    super(height);
    this.type = 'truck';
    this.x = x;
    this.y = y;
    this.width = 100;
    this.velocity = velocity;
    this.fillStyle = 'cadetblue';
  }
}


module.exports = Truck;