class Frog {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 250;
    this.y = 600;
    this.ctx.fillStyle = 'green';
  }

  drawFrog() {
    this.ctx.fillRect(this.x, this.y, 50, 50);
  }

  moveFrogUp() {
    this.y -= 50;
    this.drawFrog(this.x, this.y);
  }

  moveFrogDown() {
    this.y += 50;
    this.drawFrog(this.x, this.y);
  }

  moveFrogRight() {
    this.x += 50;
    this.drawFrog(this.x, this.y);
  }

  moveFrogLeft() {
    this.x -= 50;
    this.drawFrog(this.x, this.y);
  }
}

module.exports = Frog;