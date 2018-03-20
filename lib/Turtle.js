const Obstacle = require('../lib/Obstacle.js')

class Turtle extends Obstacle {
  constructor(x, y, height, velocity) {
    super(height);
    this.type = 'turtle';
    this.x = x;
    this.y = y;
    this.width = 100;
    this.velocity = velocity;
  }
}


module.exports = Turtle;