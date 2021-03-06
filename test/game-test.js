const assert = require('chai').assert;
const Game = require('../lib/Game.js');

describe('Game', () => {
  it('should instantiate a new game with all default properties', () => {
    const game = new Game();

    assert.isObject(game);
    assert.equal(game.score, 0);
    assert.equal(game.level, 1);
    assert.deepEqual(game.lanes[0], {height: 550, reached: false, velocity: 2});
    assert.deepEqual(game.obstaclesArray[0], {
      "height": 50,
      "type": "car2",
      "velocity": 2,
      "width": 50,
      "x": 0,
      "y": 550}); 
  });

  it('should create a new frog', () => {
    const game = new Game();

    assert.isObject(game.frogger);
  });

  it('can draw objects', () => {
    const game = new Game();

    assert.isFunction(game.drawObjects);
  });

  it('allows the user to control the frog', () => {
    const game = new Game();

    assert.isFunction(game.controlFrog);
  });

  it('allows the user to control the frog with the arrow keys', () => {
    const game = new Game();

    game.frogger.x = 0;

    game.controlFrog(20, 550, 650);

    assert.equal(game.frogger.x, 0);

    game.controlFrog(39, 550, 650);

    assert.equal(game.frogger.x, 50);
  });

  it('lose a life if there is a collision with a car or truck', () => {
    const game = new Game();

    game.showDeath = () => {};
    game.updateLivesDisplay = () => {};
    game.frogger.y = 400;
    game.frogger.x = 100;
    game.obstaclesArray[0].x = 100;
    game.obstaclesArray[0].y = 400;
    game.frogger.lives = 3;

    game.checkForRoadCollision();

    assert.equal(game.frogger.lives, 2);
  });

  it('only checks for a collision on the road if the frog is on the road', () => {
    const game = new Game();

    game.frogger.x = 100;
    game.frogger.y = 500;

    game.animateObstacles();

    assert.equal(game.frogger.lives, 3);
  });

  it('if collision on river, frog rides obstacle', () => {
    const game = new Game();

    game.frogger.x = 330;
    game.frogger.y = 200;

    game.animateObstacles();

    assert.isAbove(game.frogger.x, 330);
  });

  it('only checks for a collision on the water if the frog is on the water', () => {
    const game = new Game();

    game.showDeath = () => {};
    game.updateLivesDisplay = () => {};
    game.frogger.x = 100;
    game.frogger.y = 400;
    game.obstaclesArray[0].x = 100;
    game.obstaclesArray[0].y = 400;

    game.animateObstacles();

    assert.equal(game.frogger.velocity, 0);
  });

  it('game over if loses all three lives', () => {
    const game = new Game();

    game.frogger.lives = 1;
    game.updateLivesDisplay = () => {};
    game.showDeath = () => {};
    game.showGameOver = () => {game.startedNewGame = true};

    game.loseLife();

    assert.equal(game.startedNewGame, true);
  });

  it('moves to next level when frog reaches the top', () => {
    const game = new Game();

    game.showLevelUp = () => {};
    game.updateLevelDisplay = () => {};
    game.updateScoreDisplay = () => {};
    game.frogger.x = 174.5;
    game.frogger.y = 50;
    game.level = 1;

    game.controlFrog(38, 550, 650);
    game.animateObstacles();

    assert.equal(game.level, 2);
    assert.equal(game.frogger.y, 600);
  });

  it('should reset the frog to the starting point when the frog dies', () => {
    const game = new Game();
    
    game.updateLivesDisplay = () => {};
    game.showDeath = () => {};

    game.frogger.x = 150;
    game.frogger.y = 300;

    game.loseLife();

    assert.equal(game.frogger.x, 250)
    assert.equal(game.frogger.y, 600)
    assert.equal(game.frogger.direction, 'up')
  })

  it('keeps score', () => {
    const game = new Game();

    assert.equal(game.score, 0);
  });

  it('gains 10 points for each new height reached', () => {
    const game = new Game();

    game.score = 0;
    game.updateScoreDisplay = () => {};

    game.controlFrog(38, 550, 650);

    assert.equal(game.score, 10);  
  });

  it('keeps track of score upon uplevel', () => {
    const game = new Game();

    game.score = 100;
    game.level = 1;
    game.showLevelUp = () => {};
    game.updateLevelDisplay = () => {};

    game.levelUp();

    assert.equal(game.level, 2);
    assert.equal(game.score, 100);
  });

  it('should continue to add 10 points for each level reached after uplevel', () => {
    const game = new Game();

    game.score = 100;
    game.level = 1;
    game.showLevelUp = () => {};
    game.updateLevelDisplay = () => {};
    game.updateScoreDisplay = () => {};

    game.levelUp();
    game.controlFrog(38, 550, 650);

    assert.equal(game.score, 110);
  });

  it('should not gain points for lateral motion', () => {
    const game = new Game();

    game.score = 0;

    game.controlFrog(39, 550, 650);
    assert.equal(game.score, 0);

    game.controlFrog(37, 550, 650);
    assert.equal(game.score, 0);
  });

  it('should not gain points for backwards motion', () => {
    const game = new Game();

    game.score = 0;

    game.controlFrog(40, 550, 650);
    assert.equal(game.score, 0);
  });

  it('should not gain points for forword progress that has been previously reached', () => {
    const game = new Game();

    game.score = 0;
    game.updateScoreDisplay = () => {};

    game.controlFrog(38, 550, 650);
    assert.equal(game.score, 10);

    game.controlFrog(40, 550, 650);
    assert.equal(game.score, 10);

    game.controlFrog(38, 550, 650);
    assert.equal(game.score, 10);
  });

  it('increases velocity of obstacles upon uplevel', () => {
    const game = new Game();

    game.showLevelUp = () => {};
    game.updateLevelDisplay = () => {};

    game.levelUp();

    assert.equal(game.obstaclesArray[0].velocity, 2.5);
  });

});
