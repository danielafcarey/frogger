class Obstacle {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.velocity = velocity;
  }

  drawSelf(ctx) {
    const img = new Image();

    img.src = `./assets/${this.type}.png`;
    ctx.drawImage(img, this.x, this.y);
  }

  moveObstacles() {
    const gameWidth = 550;

    if (this.x < gameWidth - 1 && this.velocity > 0) {
      this.x += this.velocity;
    } else if (this.x >= gameWidth - 1 && this.velocity > 0) {
      this.x = -this.width;
    } 

    if (this.x > -this.width + 1 && this.velocity < 0) {
      this.x += this.velocity;
    } else if (this.x <= -this.width + 1 && this.velocity < 0) {
      this.x = gameWidth;
    }
  }

}

module.exports = Obstacle;
