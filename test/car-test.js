const assert = require('chai').assert;
// const Obstacle = require('../lib/Obstacle.js');
const Car = require('../lib/Car.js');

describe('Car', function() {
  it('should instantiate a new Log', function() {
    var car = new Car();

    assert.isObject(car);
  });

  it('inherits type, x, y, width, height, and velocity properties from the Obstacle class', function() {
    var car = new Car();

    assert.isDefined(car.type);
    assert.isNumber(car.x);
    assert.isNumber(car.y);
    assert.isNumber(car.width);
    assert.isNumber(car.height);
    assert.isNumber(car.velocity);
  });

  it('inherits functions from the Obstacle class', function() {
    var car = new Car();

    car.drawObstacle();
    car.moveObstacle();
    car.increaseSpeed();
  });



})