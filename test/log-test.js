const assert = require('chai').assert;
const Log = require('../lib/Log.js');

describe('Log', () => {
  it('should instantiate a new Log with all default properties', () => {
    const log = new Log();

    assert.isObject(log);
    assert.equal(log.type, 'log');
    assert.equal(log.width, 150);
  });

  it('takes x, y, and velocity as parameters', () => {
    const log = new Log(1, 2, 3);

    assert.equal(log.x, 1);
    assert.equal(log.y, 2);
    assert.equal(log.velocity, 3);
  })

})
