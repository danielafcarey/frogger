const assert = require('chai').assert;
const Log = require('../lib/Log.js');

describe('Log', function() {
  it('should instantiate a new Log', function() {
    var log = new Log();

    assert.isObject(log);
  });

  it('takes x, y, and velocity as parameters', function() {
    var log = new Log(1, 2, 3);

    assert.equal(log.x, 1);
    assert.equal(log.y, 2);
    assert.equal(log.velocity, 3);
  })

  it('inherits height from the Obstacle class', function() {
    var log = new Log();

    assert.equal(log.height, 50);
  });

  it('inherits functions from the Obstacle class', function() {
    var log = new Log();

    log.moveObstacles();
    log.increaseSpeed();
  });

  it('has a default type and width', function() {
    var log = new Log();

    assert.equal(log.type, 'log');
    assert.equal(log.width, 150);
  })



})
