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

  it('starts with three lives', function() {
    var game = new Game();

    assert.equal(game.lives, 3);
  });

  it.skip('lose a life if there is a collision', function() {
    var game = new Game();
    game.lives = 3;

    game.loseLife();
    assert.equal(game.lives, 2);
  });

  it.skip('game over if loses all three lives', function() {
    var game = new Game();
    game.lives = 1;

    assert.equal(game.gameOver, false);
    game.loseLife();
    assert.equal(game.gameOver, true);
  });

  it.skip('moves to next level when frog reaches the top', function() {
    var game = new Game();
    game.frogger.y = 50; //one jump away from top bar
    game.level = 1;

    game.controlFrog(38, 550, 700); //up keycode, random width/height
    game.levelUp();

    assert.equal(game.level, 2);
    assert.equal(game.frogger.x, 550);
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

  it.skip('increases velocity of obstacles upon uplevel', function() {
    var game = new Game();
    game.obstacle.velocity = 1;

    game.levelUp();

    assert.equal(game.obstacle.velocity, 1.5);
  });

  it('should not be able to move the frog up if it is at the top of the screen', function() {
    var game = new Game();
    var frog = new Frog();
    frog.y = 0;
    frog.moveFrogUp();
    assert.equal(frog.y, 0) 
  });

  it('should not be able to move the frog left if it is on the left side of the screen', function() {
    var game = new Game();
    var frog = new Frog();
    frog.x = 0;
    frog.moveFrogLeft();
    assert.equal(frog.x, 0) 
  });

  it('should not be able to move the frog down if it is on the bottom of the screen', function() {
    var game = new Game();
    var frog = new Frog();
    frog.y = 700;
    frog.moveFrogDown();
    assert.equal(frog.y, 700) 
  });

  it('should not be able to move the frog right if it is on the right side of the screen', function() {
    var game = new Game();
    var frog = new Frog();
    frog.x = 550;
    frog.moveFrogRight();
    assert.equal(frog.x, 550) 
  });

})
