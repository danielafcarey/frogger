class Frog {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 250;
    this.y = 600;
    this.ctx.fillStyle = 'green';
  }

  drawFrog(x, y) {
    this.x = x;
    this.y = y;
    this.ctx.fillRect(this.x, this.y, 50, 50);
  }

  move() {
    this.ctx.clearRect(this.x, this.y, 50, 50);
    this.y -= 50;
    this.drawFrog(this.x, this.y);

  }
}

module.exports = Frog;