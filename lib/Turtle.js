const Obstacle = require('../lib/Obstacle.js')

class Turtle extends Obstacle {
  constructor(x, y, velocity) {
    super(x, y, velocity);
    this.type = 'turtle';
    this.width = 100;
  }
}


module.exports = Turtle;