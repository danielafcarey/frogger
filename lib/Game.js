const Frog = require('./Frog.js')
const Car = require('./Car.js')
const Car2 = require('./Car2.js')
const Truck = require('./Truck.js')
const Log = require('./Log.js')
const Turtle = require('./Turtle.js')

  
class Game {
  constructor() {
    this.gameWidth = 550;
    this.gameHeight = 650;
    this.score = 0;
    this.level = 1;
    this.frogger = new Frog()
    this.lanes = [
      {height: 550, reached: false, velocity: 2},
      {height: 500, reached: false, velocity: -3},
      {height: 450, reached: false, velocity: 1.25},
      {height: 400, reached: false, velocity: -6},
      {height: 350, reached: false, velocity: 1.5},
      {height: 300, reached: false, velocity: 0},
      {height: 250, reached: false, velocity: -2},
      {height: 200, reached: false, velocity: 2.5},
      {height: 150, reached: false, velocity: -1},
      {height: 100, reached: false, velocity: 4.5},
      {height: 50, reached: false, velocity: -.5},
      {height: 0, reached: false, velocity: 0}
    ]
    this.obstaclesArray = [
      new Car2(0, this.lanes[0].height, this.lanes[0].velocity),
      new Car2(150, this.lanes[0].height, this.lanes[0].velocity),
      new Car(525, this.lanes[1].height, this.lanes[1].velocity),
      new Car(375, this.lanes[1].height, this.lanes[1].velocity),
      new Car(225, this.lanes[1].height, this.lanes[1].velocity),
      new Truck(250, this.lanes[2].height, this.lanes[2].velocity),
      new Car(225, this.lanes[3].height, this.lanes[3].velocity),
      new Car(375, this.lanes[3].height, this.lanes[3].velocity),
      new Truck(400, this.lanes[4].height, this.lanes[4].velocity),
      new Truck(125, this.lanes[4].height, this.lanes[4].velocity),
      new Log(300, this.lanes[6].height, this.lanes[6].velocity),
      new Turtle(325, this.lanes[7].height, this.lanes[7].velocity),
      new Turtle(150, this.lanes[7].height, this.lanes[7].velocity),
      new Log(400, this.lanes[8].height, this.lanes[8].velocity),
      new Log(100, this.lanes[8].height, this.lanes[8].velocity),
      new Turtle(100, this.lanes[9].height, this.lanes[9].velocity),
      new Log(425, this.lanes[10].height, this.lanes[10].velocity),
      new Log(175, this.lanes[10].height, this.lanes[10].velocity)
    ];

  }


  drawObjects(ctx) {
    this.obstaclesArray.forEach(obstacle => {
      obstacle.drawSelf(ctx)
    })
    this.frogger.drawFrog(ctx);
  }

  animateObstacles() {
    this.obstaclesArray.forEach(obstacle => obstacle.moveObstacles())
    this.checkFrogLocation();  
  }

  checkFrogLocation() {
    if (this.frogger.y > this.lanes[5].height) {
      this.checkForRoadCollision();
    } else if (this.frogger.y < this.lanes[5].height && this.frogger.y >= 50) {
      this.checkForRiverCollision();
    } else if (this.frogger.y < 50) {
      this.levelUp();
    }
  }

  controlFrog(keycode) {
    if (keycode === 38) {
      this.frogger.moveFrogUp()
      this.addScore();
    } else if (keycode === 40) {
      this.frogger.moveFrogDown(this.gameHeight)
    } else if (keycode === 39) {
      this.frogger.moveFrogRight(this.gameWidth)
    } else if (keycode === 37) {
      this.frogger.moveFrogLeft()
    }
  }

  checkForRoadCollision() {
    this.obstaclesArray.forEach(obstacle => {
      const frogLeft = this.frogger.x;
      const frogRight = this.frogger.x + this.frogger.width;
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.width;

      if ((obstacleLeft <= frogLeft && frogLeft <= obstacleRight && obstacle.y === this.frogger.y) || 
        (frogLeft <= obstacleLeft && obstacleLeft <= frogRight && obstacle.y === this.frogger.y)
      ) {
        this.loseLife()
      }
    })
  }

  checkForRiverCollision() {
    let collidingObstacle = this.obstaclesArray.find(obstacle => {
      const frogLeft = this.frogger.x;
      const frogRight = this.frogger.x + this.frogger.width;
      const obstacleLeft = obstacle.x - 10;
      const obstacleRight = obstacle.x + obstacle.width + 10;

      if ((obstacleLeft <= frogLeft) && (frogLeft <= obstacleRight) &&
        (obstacleLeft <= frogRight) && (frogRight <= obstacleRight) &&
        (obstacle.y === this.frogger.y) 
      ) {
        return obstacle
      }
    })

    if (collidingObstacle !== undefined) {
      this.frogRidesObstacle(collidingObstacle);
    } else {
      this.loseLife()
    }
    
  }

  frogRidesObstacle(collidingObstacle) {
    const frogLeft = this.frogger.x;
    const frogRight = this.frogger.x + this.frogger.width;

    this.frogger.x += collidingObstacle.velocity
    
    if (frogRight > this.gameWidth || frogLeft <= 0) {
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
    document.querySelector('.final-score').innerText = 
      `Final Score: ${this.score}`;
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
    this.increaseObstacleSpeed();
  }

  increaseObstacleSpeed() {
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