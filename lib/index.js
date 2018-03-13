class Game {
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, 50);


    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 50, canvas.width, 250);


    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 300, canvas.width, 50);


    ctx.fillStyle = 'black';
    ctx.fillRect(0, 350, canvas.width, 250);


    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 600, canvas.width, 50);


    ctx.fillStyle = 'black';
    ctx.fillRect(0, 650, canvas.width, 50);
  }


}

new Game('canvas');