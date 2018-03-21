class Obstacle {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.velocity = velocity;
  }

  drawSelf(ctx) {
    const img = new Image();

    img.src = `../assets/${this.type}.png`;
    ctx.drawImage(img, this.x, this.y);
  }

  moveObstacles() {
    if (this.x < 549 && this.velocity > 0) {
      this.x += this.velocity;
    } else if (this.x >= 549 && this.velocity > 0) {
      this.x = -this.width;
    } 

    if (this.x > -this.width + 1 && this.velocity < 0) {
      this.x += this.velocity;
    } else if (this.x <= -this.width + 1 && this.velocity < 0) {
      this.x = 550;
    }
  }

}

module.exports = Obstacle;
