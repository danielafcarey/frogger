const assert = require('chai').assert;
// const Obstacle = require('../lib/Obstacle.js');
const Log = require('../lib/Log.js');

describe('Log', function() {
  it('should instantiate a new Log', function() {
    var log = new Log();

    assert.isObject(log);
  });

  it('inherits type, x, y, width, height, and velocity properties from the Obstacle class', function() {
    var log = new Log();

    assert.isDefined(log.type);
    assert.isNumber(log.x);
    assert.isNumber(log.y);
    assert.isNumber(log.width);
    assert.isNumber(log.height);
    assert.isNumber(log.velocity);
  });

  it('inherits functions from the Obstacle class', function() {
    var log = new Log();

    log.drawObstacle();
    log.moveObstacle();
    log.increaseSpeed();
  });



})