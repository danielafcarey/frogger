const assert = require('chai').assert;
const Game = require('../lib/Game.js');
const Frog = require('../lib/Frog.js')


describe('Game', function() {
  it('should instantiate a new game', function() {
    var game = new Game();

    assert.isObject(game)
  });

  it('should create a new frog', function() {
    var game = new Game();

    assert.isObject(game.frogger)
  });

  it('can draw objects', function() {
    var game = new Game();

    assert.isFunction(game.drawObjects)
  });

  it('allows the user to control the frog', function() {
    var game = new Game();

    assert.isFunction(game.controlFrog)
  });

  it('allows the user to control the frog with the arrow keys', function() {
    var game = new Game();
    game.frogger.x = 0;

    game.controlFrog(20, 200, 200);

    assert.equal(game.frogger.x, 0);

    game.controlFrog(39, 200, 200);

    assert.equal(game.frogger.x, 50);
  });

  it('lose a life if there is a collision with a car or truck', function() {
    var game = new Game();
    game.showDeath = function() {};
    game.frogger.y = 400;
    game.frogger.x = 100;
    game.obstaclesArray[0].x = 100;
    game.obstaclesArray[0].y = 400;
    game.frogger.lives = 3;

    game.checkForRoadCollision();

    assert.equal(game.frogger.lives, 2);
  });

  it('only checks for a collision on the road if the frog is on the road', function() {
    var game = new Game();
    game.frogger.x = 100;
    game.frogger.y = 500;

    game.animateObstacles();

    assert.equal(game.frogger.lives, 3);
  })

  it('if collision on river, frog rides obstacle', function() {
    var game = new Game();
    game.frogger.x = 330;
    game.frogger.y = 200;

    game.animateObstacles();

    assert.isAbove(game.frogger.x, 330);
  })


  it('only checks for a collision on the water if the frog is on the water', function() {
    var game = new Game();
    game.showDeath = function() {};
    game.frogger.x = 100;
    game.frogger.y = 400;
    game.obstaclesArray[0].x = 100;
    game.obstaclesArray[0].y = 400;

    game.animateObstacles();

    assert.equal(game.frogger.velocity, 0);
  })

  it.skip('game over if loses all three lives', function() {
    var game = new Game();
    game.lives = 1;

    assert.equal(game.gameOver, false);

    game.loseLife();

    assert.equal(game.gameOver, true);
  });

  it('moves to next level when frog reaches the top', function() {
    var game = new Game();
    game.showLevelUp = function() {};
    game.frogger.x = 174.5;
    game.frogger.y = 50;
    game.level = 1;

    game.controlFrog(38, 550, 700); //up keycode, random width/height
    game.animateObstacles();

    assert.equal(game.level, 2);
    assert.equal(game.frogger.y, 600);
  });

  it('keeps score', function() {
    var game = new Game();

    assert.equal(game.score, 0);
  });

  it.skip('gains 10 points for each new height reached', function() {
    var game = new Game();
    game.score = 0;

    game.controlFrog(38, 200, 200); //up keycode, random width/height

    assert.equal(game.score, 50);  
  });

  it.skip('keeps track of score upon uplevel', function() {
    var game = new Game();
    game.score = 100;

    game.frogger.y = 50; //one jump away from top bar
    game.level = 1; 

    game.controlFrog(38, 200, 200); //up keycode, random width/height (moveFrogUp)
    game.levelUp();

    assert.equal(game.level, 2);
    assert.equal(game.score, 150); //received 50 more points for reaching top
  })

  it('increases velocity of obstacles upon uplevel', function() {
    var game = new Game();
    game.showLevelUp = function() {};

    game.levelUp();

    assert.equal(game.obstaclesArray[0].velocity, 2.5);
  });

})
