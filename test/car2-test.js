const assert = require('chai').assert;
const Car2 = require('../lib/Car2.js');

describe('Car2', () => {
  it('should instantiate a new Car2', () => {
    const car2 = new Car2();

    assert.isObject(car2);
    assert.equal(car2.type, 'car2');
    assert.equal(car2.width, 50);
  });

  it('takes x, y, and velocity as parameters', () => {
    const car2 = new Car2(1, 2, 3);

    assert.equal(car2.x, 1);
    assert.equal(car2.y, 2);
    assert.equal(car2.velocity, 3);
  })

})
