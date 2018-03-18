class Frog {
  constructor() {
    this.x = 250;
    this.y = 600;
    this.width = 50;
    this.height = 50;
    this.lives = 3;
  }

  drawFrog(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // var img = new Image();
    // img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
    // img.onload = function() {
    //   ctx.drawImage(img, this.x, this.y);
    // };

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

  dies() {
    this.lives--;
  }
}

module.exports = Frog;
