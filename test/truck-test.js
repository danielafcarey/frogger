const assert = require('chai').assert;
const Truck = require('../lib/Truck.js');

describe('Truck', () => {
  it('should instantiate a new Truck', () => {
    const truck = new Truck();

    assert.isObject(truck);
  });

  it('takes x, y, and velocity as parameters', () => {
    const truck = new Truck(1, 2, 3);

    assert.equal(truck.x, 1);
    assert.equal(truck.y, 2);
    assert.equal(truck.velocity, 3);
  })

  it('inherits height from the Obstacle class', () => {
    const truck = new Truck();

    assert.equal(truck.height, 50);
  });

  it('inherits functions from the Obstacle class', () => {
    const truck = new Truck();

    truck.moveObstacles();
    truck.increaseSpeed();
  });

  it('has a default type and width', () => {
    const truck = new Truck();

    assert.equal(truck.type, 'truck');
    assert.equal(truck.width, 150);
  })



})
