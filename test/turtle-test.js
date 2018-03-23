const assert = require('chai').assert;
const Turtle = require('../lib/Turtle.js');

describe('Turtle', () => {
  it('should instantiate a new Turtle with all default properties', () => {
    const turtle = new Turtle();

    assert.isObject(turtle);
    assert.equal(turtle.type, 'turtle');
    assert.equal(turtle.width, 100);
  });

  it('takes x, y, and velocity as parameters', () => {
    const turtle = new Turtle(1, 2, 3);

    assert.equal(turtle.x, 1);
    assert.equal(turtle.y, 2);
    assert.equal(turtle.velocity, 3);
  })

})
