const assert = require('chai').assert;
// const Obstacle = require('../lib/Obstacle.js');
const Truck = require('../lib/Truck.js');

describe('Truck', function() {
  it('should instantiate a new Log', function() {
    var truck = new Truck();

    assert.isObject(truck);
  });

  it('inherits type, x, y, width, height, and velocity properties from the Obstacle class', function() {
    var truck = new Truck();

    assert.isDefined(truck.type);
    assert.isNumber(truck.x);
    assert.isNumber(truck.y);
    assert.isNumber(truck.width);
    assert.isNumber(truck.height);
    assert.isNumber(truck.velocity);
  });

  it('inherits functions from the Obstacle class', function() {
    var truck = new Truck();

    truck.drawObstacle();
    truck.moveObstacle();
    truck.increaseSpeed();
  });


})