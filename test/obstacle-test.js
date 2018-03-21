const assert = require('chai').assert;
const Obstacle = require('../lib/Obstacle.js');

describe('Obstacle', () => {
  it('should instantiate a new Obstacle', () => {
    const obstacle = new Obstacle();
    
    assert.isObject(obstacle);
  });

  it('has a default height', () => {
    const obstacle = new Obstacle();

    assert.equal(obstacle.height, 50);
  });

  it('should be able to draw the obstacle on the canvas', () => {
    const obstacle = new Obstacle();

    assert.isFunction(obstacle.drawSelf)
  })

  it('can move the Obstacle right or left along the x-axis', () => {
    const obstacle = new Obstacle(10, 50, 1);

    obstacle.moveObstacles();

    assert.equal(obstacle.x, 11);

    obstacle.velocity = -1;
    obstacle.width = 50;

    obstacle.moveObstacles();
    
    assert.equal(obstacle.x, 10);    
  });

  it('restarts on the left side of canvas when it reaches the right boundary', () => {
    const obstacle = new Obstacle(549, 50, 1);
    obstacle.width = 50;

    obstacle.moveObstacles();

    assert.equal(obstacle.x, -50);
  });


  it('restarts on the right side of canvas when it exits the left boundary', () => {
    const obstacle = new Obstacle(10, 50, -1);
    obstacle.width = 50
    obstacle.x = 1 - obstacle.width;

    obstacle.moveObstacles();

    assert.equal(obstacle.x, 550);
  });

  it('can increase its velocity', () => {
    const obstacle = new Obstacle();
    obstacle.velocity = 3;

    obstacle.increaseSpeed();

    assert.equal(obstacle.velocity, 3.5);
  });

})











