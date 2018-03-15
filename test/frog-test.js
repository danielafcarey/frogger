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

  it('it moves up when the moveFrogUp function is called', function() {
    var frog = new Frog();
    frog.y = 500;
    frog.moveFrogUp();
    assert.equal(frog.y, 450)
  });


  it('it moves right when the moveFrogRight function is called', function() {
    var frog = new Frog();
    frog.x = 100;
    frog.moveFrogRight();
    assert.equal(frog.x, 150)
  });


  it('it moves left when the moveFrogLeft function is called', function() {
    var frog = new Frog();
    frog.x = 100;
    frog.moveFrogLeft();
    assert.equal(frog.x, 50)
  });


  it('it moves down when the moveFrogDown function is called', function() {
    var frog = new Frog();
    frog.y = 500;
    frog.moveFrogDown();
    assert.equal(frog.y, 550)
  })
})
