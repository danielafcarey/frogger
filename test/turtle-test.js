const assert = require('chai').assert;
const Turtle = require('../lib/Turtle.js');

describe('Turtle', function() {
  it('should instantiate a new Turtle', function() {
    var turtle = new Turtle();

    assert.isObject(turtle);
  });

  it('takes x, y, height, and velocity as parameters', function() {
    var turtle = new Turtle(1, 2, 3, 4);

    assert.equal(turtle.x, 1);
    assert.equal(turtle.y, 2);
    assert.equal(turtle.height, 50);
    assert.equal(turtle.velocity, 4);
  })

  it('inherits height from the Obstacle class', function() {
    var turtle = new Turtle();

    assert.equal(turtle.height, 50);
  });

  it('inherits functions from the Obstacle class', function() {
    var turtle = new Turtle();

    turtle.moveObstacles();
    turtle.increaseSpeed();
  });

  it('has a default type, width, and fillStyle', function() {
    var turtle = new Turtle();

    assert.equal(turtle.type, 'turtle');
    assert.equal(turtle.width, 50);
    assert.equal(turtle.fillStyle, 'limegreen');    
  })



})
