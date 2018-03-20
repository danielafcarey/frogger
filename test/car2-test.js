const assert = require('chai').assert;
const Car2 = require('../lib/Car2.js');

describe('Car2', function() {
  it('should instantiate a new Car2', function() {
    var car2 = new Car2();

    assert.isObject(car2);
  });

  it('takes x, y, and velocity as parameters', function() {
    var car2 = new Car2(1, 2, 3);

    assert.equal(car2.x, 1);
    assert.equal(car2.y, 2);
    assert.equal(car2.velocity, 3);
  })

  it('inherits height from the Obstacle class', function() {
    var car2 = new Car2();

    assert.equal(car2.height, 50);
  });

  it('inherits functions from the Obstacle class', function() {
    var car2 = new Car2();

    car2.moveObstacles();
    car2.increaseSpeed();
  });

  it('has a default type and width', function() {
    var car2 = new Car2();

    assert.equal(car2.type, 'car2');
    assert.equal(car2.width, 50);
  })



})
