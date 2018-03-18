const assert = require('chai').assert;
const Frog = require('../lib/Frog.js');

describe('Frog', function() {

  it('should instantiate a new frog', function() {
    var frog = new Frog();
    assert.isObject(frog);
  });

  it('should have a width of 50 and a height of 50', function() {
    var frog = new Frog();
    assert.equal(frog.width, 50);
    assert.equal(frog.height, 50);
  });

  
  it('should start at coordinates (250, 600)', function() {
    var frog = new Frog();
    assert.equal(frog.x, 250);
    assert.equal(frog.y, 600);
  });

  it('should be able to draw the frog', function() {
    var frog = new Frog();
    assert.isFunction(frog.drawFrog);
  });

  it('moves up when the moveFrogUp function is called', function() {
    var frog = new Frog();
    frog.y = 500;
    frog.moveFrogUp();
    assert.equal(frog.y, 450)
  });


  it('moves right when the moveFrogRight function is called', function() {
    var frog = new Frog();
    frog.x = 100;
    frog.moveFrogRight();
    assert.equal(frog.x, 150)
  });


  it('moves left when the moveFrogLeft function is called', function() {
    var frog = new Frog();
    frog.x = 100;
    frog.moveFrogLeft();
    assert.equal(frog.x, 50)
  });


  it('moves down when the moveFrogDown function is called', function() {
    var frog = new Frog();
    frog.y = 500;
    frog.moveFrogDown();
    assert.equal(frog.y, 550)
  })

  it('should not be able to move up if it is at the top of the screen', function() {
    var frog = new Frog();
    frog.y = 0;
    frog.moveFrogUp();
    assert.equal(frog.y, 0) 
  });

  it('should not be able to move left if it is on the left side of the screen', function() {
    var frog = new Frog();
    frog.x = 0;
    frog.moveFrogLeft();
    assert.equal(frog.x, 0) 
  });

  it('should not be able to move down if it is on the bottom of the screen', function() {
    var frog = new Frog();
    frog.y = 650;
    frog.moveFrogDown(550, 700);
    assert.equal(frog.y, 650) 
  });

  it('should not be able to move right if it is on the right side of the screen', function() {
    var frog = new Frog();
    frog.x = 500;
    frog.moveFrogRight(550, 700);
    assert.equal(frog.x, 500) 
  });

  it('should start with three lives', function() {
    var frog = new Frog();
    assert.equal(frog.lives, 3)
  })

  it.skip('should die when it collides with an obstacle', function() {
    var frog = new Frog();
    var obstacle = new Obstacle();
    frog.x = 150;
    obstacle.x = 150;
    assert.equal(frog.isAlive, false)
  });

  it('should lose a life when it dies', function() {
    var frog = new Frog();
    frog.lives = 2;
    frog.dies();
    assert.equal(frog.lives, 1)
  });

  it.skip('should be able to ride a log', function() {
    var frog = new Frog();
    var obstacle = new Obstacle();
    frog.x = 400;
    obstacle.x = 400;
    assert.equal(frog.dx, log.dx)
  });

  it.skip('should gain ten points for forward progress', function() {
    var frog = new Frog();
    frog.y = 500;
    frog.score = 30;
    frog.moveFrogUp();
    assert.equal(frog.score, 40)
  });

  it.skip('should not gain points for lateral motion', function() {
    var frog = new Frog();
  });

  it.skip('should not gain points for backwards motion', function() {
    var frog = new Frog();
  })

  it.skip('should not gain points for forword progress that is has previously reached', function() {
    
  }
  )
})
