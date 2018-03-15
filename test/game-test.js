const assert = require ('chai').assert;
const Game = require('../lib/Game.js');


describe('Game', function() {
  it('should instantiate a new game', function() {
    var game = new Game();
    assert.isObject(game)
  })

  it('should create a new frog', function() {
    var game = new Game();
    assert.isObject(game.frogger)
  })

  it('allows the user to control the frog', function() {
    var game = new Game();
    assert.isFunction(game.controlFrog)
  })

  it('can draw objects', function() {
    var game = new Game();
    assert.isFunction(game.drawObjects)
  })
})
