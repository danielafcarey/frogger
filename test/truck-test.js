const assert = require('chai').assert;
const Truck = require('../lib/Truck.js');

describe('Truck', function() {
  it('should instantiate a new Truck', function() {
    var truck = new Truck();

    assert.isObject(truck);
  });

  it('takes x, y, height, and velocity as parameters', function() {
    var truck = new Truck(1, 2, 3, 4);

    assert.equal(truck.x, 1);
    assert.equal(truck.y, 2);
    assert.equal(truck.height, 50);
    assert.equal(truck.velocity, 4);
  })

  it('inherits height from the Obstacle class', function() {
    var truck = new Truck();

    assert.equal(truck.height, 50);
  });

  it('inherits functions from the Obstacle class', function() {
    var truck = new Truck();

    truck.moveObstacles();
    truck.increaseSpeed();
  });

  it('has a default type, width, and fillStyle', function() {
    var truck = new Truck();

    assert.equal(truck.type, 'truck');
    assert.equal(truck.width, 100);
    assert.equal(truck.fillStyle, 'cadetblue');    
  })



})
