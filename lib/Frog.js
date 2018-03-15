class Frog {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 250;
    this.y = 600;
    this.width = 50;
    this.height = 50;
    this.ctx.fillStyle = 'green';
  }

  drawFrog() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
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