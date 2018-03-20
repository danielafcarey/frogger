const Obstacle = require('../lib/Obstacle.js')

class Log extends Obstacle {
  constructor(x, y, velocity) {
    super(x, y, velocity);
    this.type = 'log';
    this.width = 150;
  }
}


module.exports = Log;