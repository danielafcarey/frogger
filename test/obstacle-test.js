const assert = require('chai').assert;
const Obstacle = require('../lib/Obstacle.js');

describe('Obstacle', function() {
  it('should instantiate a new Obstacle', function() {
    var obstacle = new Obstacle();
    
    assert.isObject(obstacle);
  });

  it('has a default type', function() {
    var obstacle = new Obstacle();

    assert.isDefined(obstacle.type);
  });

  it('has an integer as a default x and y value, width, height, and velocity', function() {
    var obstacle = new Obstacle();

    assert.isNumber(obstacle.x);
    assert.isNumber(obstacle.y);
    assert.isNumber(obstacle.width);
    assert.isNumber(obstacle.height);
    assert.isNumber(obstacle.velocity);
  });

  it('should be able to draw the obstacle on the canvas', function() {
    var obstacle = new Obstacle();

    assert.isFunction(obstacle.drawObstacle)
  })

  it('can moveObstacle right or left along the x-axis', function() {
    var obstacle = new Obstacle();

    obstacle.x = 10;
    obstacle.velocity = 1;
    obstacle.moveObstacle();
    assert.equal(obstacle.x, 11);

    obstacle.velocity = -1;
    obstacle.moveObstacle();
    assert.equal(obstacle.x, 10);    
  });

  it('restarts on the left side of canvas when it reaches the right boundary', function() {
    var obstacle = new Obstacle();
    obstacle.x = 550 - obstacle.width; //page width - width of obstacle;
    obstacle.velocity = 1;

    obstacle.moveObstacle();

    assert.equal(obstacle.x, 0);
  });


  it('restarts on the right side of canvas when it reaches the left boundary', function() {
    var obstacle = new Obstacle();
    obstacle.x = 0;
    obstacle.velocity = -1;

    obstacle.moveObstacle();

    assert.equal(obstacle.x, 550);
  });

  it('can increase its velocity', function() {
    var obstacle = new Obstacle();
    obstacle.velocity = 3;

    obstacle.increaseSpeed();

    assert.equal(obstacle.velocity, 3.5);
  });

})











