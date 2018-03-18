const Obstacle = require('../lib/Obstacle.js')

class Log extends Obstacle {
  constructor(x, y, height, velocity) {
    super(height);
    this.type = 'log';
    this.x = x;
    this.y = y;
    this.width = 150;
    this.velocity = velocity;
    this.fillStyle = 'brown';
  }
}


module.exports = Log;