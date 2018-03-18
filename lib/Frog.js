class Frog {
  constructor() {
    this.x = 250;
    this.y = 600;
    this.width = 50;
    this.height = 50;
    this.lives = 3;
    this.velocity = 0;
  }

  drawFrog(ctx) {
    var img = new Image();
    img.src = '../assets/frog-icon.png';
    ctx.drawImage(img, this.x, this.y);

  }

  moveFrogUp() {
    if (!(this.y === 0)) {
      this.y -= 50;
    }
  }

  moveFrogDown(canvasWidth, canvasHeight) {
    if (!(this.y === canvasHeight - this.height)) {
       this.y += 50;
    }
  }

  moveFrogRight(canvasWidth, canvasHeight) {
    if (!(this.x === canvasWidth - this.width)) {
      this.x += 50;
    }
  }

  moveFrogLeft() {
    if (!(this.x === 0)) {
      this.x -= 50;
    }
  }
  
}

module.exports = Frog;
