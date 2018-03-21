const Frog = require('./Frog.js')
const Obstacle = require('./Obstacle.js')
const Car = require('./Car.js')
const Car2 = require('./Car2.js')
const Truck = require('./Truck.js')
const Log = require('./Log.js')
const Turtle = require('./Turtle.js')
  
class Game {
  constructor() {
    this.score = 0;
    this.level = 1;
    this.frogger = new Frog()
    this.lanes = [{height: 550, reached: false},
                  {height: 500, reached: false},
                  {height: 450, reached: false},
                  {height: 400, reached: false},
                  {height: 350, reached: false},
                  {height: 300, reached: false},
                  {height: 250, reached: false},
                  {height: 200, reached: false},
                  {height: 150, reached: false},
                  {height: 100, reached: false},
                  {height: 50, reached: false},
                  {height: 0, reached: false},
                ]
    this.obstaclesArray = [];
    this.createObstacles();
    
  }

  createObstacles() {
    this.obstaclesArray.push(new Car2(0, this.lanes[0].height, 2));
    this.obstaclesArray.push(new Car2(150, this.lanes[0].height, 2));
    this.obstaclesArray.push(new Car(525, this.lanes[1].height, -3));
    this.obstaclesArray.push(new Car(375, this.lanes[1].height, -3));
    this.obstaclesArray.push(new Car(225, this.lanes[1].height, -3))
    this.obstaclesArray.push(new Truck(250, this.lanes[2].height, 1.25))
    this.obstaclesArray.push(new Car(225, this.lanes[3].height, -6))
    this.obstaclesArray.push(new Car(375, this.lanes[3].height, -6))
    this.obstaclesArray.push(new Truck(400, this.lanes[4].height, 1.5))
    this.obstaclesArray.push(new Truck(125, this.lanes[4].height, 1.5))
    this.obstaclesArray.push(new Log(300, this.lanes[6].height, -2))
    this.obstaclesArray.push(new Turtle(325, this.lanes[7].height, 2.5))
    this.obstaclesArray.push(new Turtle(150, this.lanes[7].height, 2.5))
    this.obstaclesArray.push(new Log(400, this.lanes[8].height, -1))
    this.obstaclesArray.push(new Log(100, this.lanes[8].height, -1))
    this.obstaclesArray.push(new Turtle(100, this.lanes[9].height, 4.5))
    this.obstaclesArray.push(new Log(425, this.lanes[10].height, -.5))
    this.obstaclesArray.push(new Log(175, this.lanes[10].height, -.5))
  }

  drawObjects(ctx) {
    this.obstaclesArray.forEach(obstacle => obstacle.drawSelf(ctx, obstacle.fillStyle))
    this.frogger.drawFrog(ctx);
  }

  animateObstacles() {
    this.obstaclesArray.forEach(obstacle => obstacle.moveObstacles())

    if (this.frogger.y > 300) {
      this.checkForRoadCollision();
    } else if (this.frogger.y < 300 && this.frogger.y >= 50){
      this.checkForRiverCollision();
    } else if (this.frogger.y < 50) {
      this.levelUp();
    }
  }

  controlFrog(keycode, canvasWidth, canvasHeight) {
    if (keycode === 38) {
      this.frogger.moveFrogUp()
      this.addScore();
    } else if (keycode === 40) {
      this.frogger.moveFrogDown(canvasWidth, canvasHeight)
    } else if (keycode === 39) {
      this.frogger.moveFrogRight(canvasWidth, canvasHeight)
    } else if (keycode === 37) {
      this.frogger.moveFrogLeft()
    }
  }

  checkForRoadCollision() {
    this.obstaclesArray.forEach(obstacle => {
      if ((obstacle.x <= this.frogger.x 
        && this.frogger.x <= (obstacle.x + obstacle.width)
        && obstacle.y === this.frogger.y) ||
        (this.frogger.x <= obstacle.x
        && obstacle.x <= (this.frogger.x + this.frogger.width)
        && obstacle.y === this.frogger.y)
        ) {
        this.loseLife()
      }
    })
  }

  checkForRiverCollision() {
    let collidingObstacle = this.obstaclesArray.find(obstacle => {
      if ((obstacle.x <= this.frogger.x) 
          && (this.frogger.x <= obstacle.x + obstacle.width)
          && (obstacle.x <= this.frogger.x + this.frogger.width)
          && (this.frogger.x + this.frogger.width <= obstacle.x + obstacle.width)
          && (obstacle.y === this.frogger.y) 
        ) {
        return obstacle
      }
    })
    if (collidingObstacle !== undefined) {
      this.frogger.x += collidingObstacle.velocity
    } else {
      this.loseLife()
    }

    if (this.frogger.x + this.frogger.width > 550 ||
        this.frogger.x <= 0) {
      this.loseLife()    
    }
  
  }

  loseLife() {
    this.frogger.lives--;
    this.lanes.forEach(lane => lane.reached = false);
    this.updateLivesDisplay();

    if (this.frogger.lives === 0) {
      this.showGameOver();
    } else {
      this.showDeath();
      this.restartLevel();
    }
  }

  showDeath() {
    document.querySelector('.death').classList.remove('hide');
    setTimeout(this.removeDeath, 1500);
  }

  removeDeath() {
    document.querySelector('.death').classList.add('hide');
  }

  showGameOver() {
    document.querySelector('.game-over').classList.remove('hide');
    document.querySelector('.final-score').innerText = `Final Score: ${this.score}`;
    setTimeout(this.newGame, 2500);
  }

  newGame() {
    window.location.reload(true);
  }

  restartLevel() {
    this.frogger.x = 250;
    this.frogger.y = 600;
    this.frogger.direction = 'up';
  }

  levelUp() {
    this.level++;
    this.lanes.forEach(lane => lane.reached = false);
    this.showLevelUp();
    this.updateLevelDisplay();
    this.restartLevel();

    this.obstaclesArray.forEach(object => {
      if (object.velocity < 0) {
        object.velocity -= .5;
      } else {
        object.velocity += .5;
      }
    })
  }

  showLevelUp() {
    document.querySelector('.level-up').classList.remove('hide');
    setTimeout(this.removeLevelUp, 1500);
  }

  removeLevelUp() {
    document.querySelector('.level-up').classList.add('hide');
  }

  addScore() {
    this.lanes.forEach(lane => {
      if (this.frogger.y === lane.height && lane.reached === false) {
        lane.reached = true;
        this.score += 10;
      }
    });
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    document.querySelector('.score').innerText = `Score: ${this.score}`;
  }

  updateLevelDisplay() {
    document.querySelector('.level').innerText = `Level: ${this.level}`;
  }

  updateLivesDisplay() {
    document.querySelector('.lives').innerText = `Lives: ${this.frogger.lives}`;
  }

}




module.exports = Game;