const assert = require('chai').assert;
const Frog = require('../lib/Frog.js');

describe('Frog', () => {

  it('should instantiate a new frog with all default properties', () => {
    const frog = new Frog();

    assert.isObject(frog);
    assert.equal(frog.width, 50);
    assert.equal(frog.height, 50);
    assert.equal(frog.x, 250);
    assert.equal(frog.y, 600);
  });

  it('should be able to draw the frog', () => {
    const frog = new Frog();

    assert.isFunction(frog.drawFrog);
  });

  it('moves up when the moveFrogUp function is called', () => {
    const frog = new Frog();

    frog.y = 500;

    frog.moveFrogUp();

    assert.equal(frog.y, 450)
  });


  it('moves right when the moveFrogRight function is called', () => {
    const frog = new Frog();

    frog.x = 100;

    frog.moveFrogRight();

    assert.equal(frog.x, 150)
  });


  it('moves left when the moveFrogLeft function is called', () => {
    const frog = new Frog();

    frog.x = 100;

    frog.moveFrogLeft();

    assert.equal(frog.x, 50)
  });


  it('moves down when the moveFrogDown function is called', () => {
    const frog = new Frog();

    frog.y = 500;

    frog.moveFrogDown();

    assert.equal(frog.y, 550)
  })

  it('should not be able to move up if it is at the top of the screen', () => {
    const frog = new Frog();

    frog.y = 0;

    frog.moveFrogUp();

    assert.equal(frog.y, 0) 
  });

  it('should not be able to move left if it is on the left side of the screen', () => {
    const frog = new Frog();

    frog.x = 0;

    frog.moveFrogLeft();

    assert.equal(frog.x, 0) 
  });

  it('should not be able to move down if it is on the bottom of the screen', () => {
    const frog = new Frog();
    frog.y = 600;

    frog.moveFrogDown(650);

    assert.equal(frog.y, 600) 
  });

  it('should not be able to move right if it is on the right side of the screen', () => {
    const frog = new Frog();
    
    frog.x = 500;

    frog.moveFrogRight(550);

    assert.equal(frog.x, 500) 
  });

  it('should start with three lives', () => {
    const frog = new Frog();

    assert.equal(frog.lives, 3)
  })

})
