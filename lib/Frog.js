class Frog {
  constructor() {
    this.x = 250;
    this.y = 600;
    this.width = 50;
    this.height = 50;
    this.lives = 3;
    this.velocity = 0;
    this.direction = 'up';
  }

  drawFrog(ctx) {
    const img = new Image();

    img.src = `./assets/frog-icon-${this.direction}.png`;
    ctx.drawImage(img, this.x, this.y);

  }

  moveFrogUp() {
    if (!(this.y === 0)) {
      this.y -= 50;
      this.direction = 'up';
    }
  }

  moveFrogDown(canvasHeight) {
    if (!(this.y === canvasHeight - this.height)) {
      this.y += 50;
      this.direction = 'down';
    }
  }

  moveFrogRight(canvasWidth) {
    if (!(this.x === canvasWidth - this.width)) {
      this.x += 50;
      this.direction = 'right';
    }
  }

  moveFrogLeft() {
    if (!(this.x === 0)) {
      this.x -= 50;
      this.direction = 'left';
    }
  }
  
}

module.exports = Frog;
