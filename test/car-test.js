const assert = require('chai').assert;
const Car = require('../lib/Car.js');

describe('Car', () => {
  it('should instantiate a new Car with all default properties', () => {
    const car = new Car();

    assert.isObject(car);
    assert.equal(car.type, 'car');
    assert.equal(car.width, 50);
  });

  it('takes x, y, and velocity as parameters', () => {
    const car = new Car(1, 2, 3);

    assert.equal(car.x, 1);
    assert.equal(car.y, 2);
    assert.equal(car.velocity, 3);
  })

})
