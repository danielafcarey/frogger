class Obstacle {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
  }

  drawObstacle() {

  }

  moveObstacle() {
    if (this.x < 549 - this.width && this.velocity > 0) {
      this.x += this.velocity;
    } else if (this.x > 549 - this.width && this.velocity > 0) {
      this.x = 0;
    } //figure out how to not hard code the width/height

    if (this.x > -this.width + 1 && this.velocity < 0) {
      this.x += this.velocity;
    } else if (this.x === -this.width + 1 && this.velocity < 0) {
      this.x = 550;
    }
  }

  increaseSpeed() {
    this.velocity += 0.5;
  }
}

module.exports = Obstacle;
