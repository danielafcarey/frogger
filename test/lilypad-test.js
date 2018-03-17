// const assert = require('chai').assert;
// const Lilypad = require('../lib/Lilypad.js');

// describe('Lilypad', function() {
//   it('should instantiate a new Log', function() {
//     var lilypad = new Lilypad();

//     assert.isObject(lilypad);
//   });

//   it('inherits type, x, y, width, height, and velocity properties from the Obstacle class', function() {
//     var lilypad = new Lilypad();

//     assert.isDefined(lilypad.type);
//     assert.isNumber(lilypad.x);
//     assert.isNumber(lilypad.y);
//     assert.isNumber(lilypad.width);
//     assert.isNumber(lilypad.height);
//     assert.isNumber(lilypad.velocity);
//   });

//   it('inherits functions from the Obstacle class', function() {
//     var lilypad = new Lilypad();

//     lilypad.drawObstacle();
//     lilypad.moveObstacle();
//     lilypad.increaseSpeed();
//   });
// })