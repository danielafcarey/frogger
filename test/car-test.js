const assert = require('chai').assert;
const Obstacle = require('../lib/Obstacle.js');
const Car = require('../lib/Car.js');

describe('Car', function() {
  it('should instantiate a new Car', function() {
    var car = new Car(0, 0, 75, 50, 1);

    assert.isObject(car);
  });

  it('inherits type, x, y, width, height, and velocity properties from the Obstacle class', function() {
    var car = new Car(0, 0, 75, 50, 1);

    assert.isDefined(car.type);
    assert.equal(car.x, 50);
    assert.isNumber(car.y);
    assert.isNumber(car.width);
    assert.isNumber(car.height);
    assert.isNumber(car.velocity);
  });

  it('inherits functions from the Obstacle class', function() {
    var car = new Car();
    console.log(car.x)
    car.moveObstacles();
    car.increaseSpeed();
  });



})
