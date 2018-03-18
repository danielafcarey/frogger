class Obstacle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
  }

  drawSelf(ctx, fillStyle) {
    var img = new Image();
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
    //figure out how to not hard code the canvas width/height
  }

  increaseSpeed() {
    this.velocity += 0.5;
  }
}

module.exports = Obstacle;
