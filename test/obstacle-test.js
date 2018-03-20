const assert = require('chai').assert;
const Obstacle = require('../lib/Obstacle.js');

describe('Obstacle', function() {
  it('should instantiate a new Obstacle', function() {
    var obstacle = new Obstacle();
    
    assert.isObject(obstacle);
  });

  it('has a default height', function() {
    var obstacle = new Obstacle();

    assert.equal(obstacle.height, 50);
  });

  it('should be able to draw the obstacle on the canvas', function() {
    var obstacle = new Obstacle();

    assert.isFunction(obstacle.drawSelf)
  })

  it('can move the Obstacle right or left along the x-axis', function() {
    var obstacle = new Obstacle(10, 50, 1);

    obstacle.moveObstacles();

    assert.equal(obstacle.x, 11);

    obstacle.velocity = -1;
    obstacle.width = 50;

    obstacle.moveObstacles();
    
    assert.equal(obstacle.x, 10);    
  });

  it('restarts on the left side of canvas when it reaches the right boundary', function() {
    var obstacle = new Obstacle(549, 50, 1);
    obstacle.width = 50;

    obstacle.moveObstacles();

    assert.equal(obstacle.x, -50);
  });


  it('restarts on the right side of canvas when it exits the left boundary', function() {
    var obstacle = new Obstacle(10, 50, -1);
    obstacle.width = 50
    obstacle.x = 1 - obstacle.width;

    obstacle.moveObstacles();

    assert.equal(obstacle.x, 550);
  });

  it('can increase its velocity', function() {
    var obstacle = new Obstacle();
    obstacle.velocity = 3;

    obstacle.increaseSpeed();

    assert.equal(obstacle.velocity, 3.5);
  });

})











