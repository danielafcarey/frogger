const assert = require('chai').assert;
const Truck = require('../lib/Truck.js');

describe('Truck', () => {
  it('should instantiate a new Truck with all default properties', () => {
    const truck = new Truck();

    assert.isObject(truck);
    assert.equal(truck.type, 'truck');
    assert.equal(truck.width, 150);
  });

  it('takes x, y, and velocity as parameters', () => {
    const truck = new Truck(1, 2, 3);

    assert.equal(truck.x, 1);
    assert.equal(truck.y, 2);
    assert.equal(truck.velocity, 3);
  })

})
