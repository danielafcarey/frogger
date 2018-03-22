/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var game = void 0;
	
	function initializeGame() {
	  game = new Game();
	}
	
	function gameLoop() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	  game.drawObjects(ctx);
	  game.animateObstacles();
	  requestAnimationFrame(gameLoop);
	}
	
	window.addEventListener('keydown', function (event) {
	  event.preventDefault();
	  game.controlFrog(event.keyCode, canvas.width, canvas.height);
	});
	
	document.querySelector('.new-game').addEventListener('click', function (event) {
	  initializeGame();
	  gameLoop();
	  document.querySelector('.start-screen').classList.add('hide');
	  event.target.classList.add('hide');
	  document.querySelector('.game-stats').classList.remove('hide');
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Frog = __webpack_require__(2);
	var Car = __webpack_require__(3);
	var Car2 = __webpack_require__(5);
	var Truck = __webpack_require__(6);
	var Log = __webpack_require__(7);
	var Turtle = __webpack_require__(8);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.score = 0;
	    this.level = 1;
	    this.frogger = new Frog();
	    this.lanes = [{ height: 550, reached: false, velocity: 2 }, { height: 500, reached: false, velocity: -3 }, { height: 450, reached: false, velocity: 1.25 }, { height: 400, reached: false, velocity: -6 }, { height: 350, reached: false, velocity: 1.5 }, { height: 300, reached: false, velocity: 0 }, { height: 250, reached: false, velocity: -2 }, { height: 200, reached: false, velocity: 2.5 }, { height: 150, reached: false, velocity: -1 }, { height: 100, reached: false, velocity: 4.5 }, { height: 50, reached: false, velocity: -.5 }, { height: 0, reached: false, velocity: 0 }];
	    this.obstaclesArray = [new Car2(0, this.lanes[0].height, this.lanes[0].velocity), new Car2(150, this.lanes[0].height, this.lanes[0].velocity), new Car(525, this.lanes[1].height, this.lanes[1].velocity), new Car(375, this.lanes[1].height, this.lanes[1].velocity), new Car(225, this.lanes[1].height, this.lanes[1].velocity), new Truck(250, this.lanes[2].height, this.lanes[2].velocity), new Car(225, this.lanes[3].height, this.lanes[3].velocity), new Car(375, this.lanes[3].height, this.lanes[3].velocity), new Truck(400, this.lanes[4].height, this.lanes[4].velocity), new Truck(125, this.lanes[4].height, this.lanes[4].velocity), new Log(300, this.lanes[6].height, this.lanes[6].velocity), new Turtle(325, this.lanes[7].height, this.lanes[7].velocity), new Turtle(150, this.lanes[7].height, this.lanes[7].velocity), new Log(400, this.lanes[8].height, this.lanes[8].velocity), new Log(100, this.lanes[8].height, this.lanes[8].velocity), new Turtle(100, this.lanes[9].height, this.lanes[9].velocity), new Log(425, this.lanes[10].height, this.lanes[10].velocity), new Log(175, this.lanes[10].height, this.lanes[10].velocity)];
	  }
	
	  _createClass(Game, [{
	    key: 'drawObjects',
	    value: function drawObjects(ctx) {
	      this.obstaclesArray.forEach(function (obstacle) {
	        obstacle.drawSelf(ctx);
	      });
	      this.frogger.drawFrog(ctx);
	    }
	  }, {
	    key: 'animateObstacles',
	    value: function animateObstacles() {
	      this.obstaclesArray.forEach(function (obstacle) {
	        return obstacle.moveObstacles();
	      });
	      this.checkFrogLocation();
	    }
	  }, {
	    key: 'checkFrogLocation',
	    value: function checkFrogLocation() {
	      if (this.frogger.y > 300) {
	        this.checkForRoadCollision();
	      } else if (this.frogger.y < 300 && this.frogger.y >= 50) {
	        this.checkForRiverCollision();
	      } else if (this.frogger.y < 50) {
	        this.levelUp();
	      }
	    }
	  }, {
	    key: 'controlFrog',
	    value: function controlFrog(keycode, canvasWidth, canvasHeight) {
	      if (keycode === 38) {
	        this.frogger.moveFrogUp();
	        this.addScore();
	      } else if (keycode === 40) {
	        this.frogger.moveFrogDown(canvasHeight);
	      } else if (keycode === 39) {
	        this.frogger.moveFrogRight(canvasWidth);
	      } else if (keycode === 37) {
	        this.frogger.moveFrogLeft();
	      }
	    }
	  }, {
	    key: 'checkForRoadCollision',
	    value: function checkForRoadCollision() {
	      var _this = this;
	
	      this.obstaclesArray.forEach(function (obstacle) {
	        if (obstacle.x <= _this.frogger.x && _this.frogger.x <= obstacle.x + obstacle.width && obstacle.y === _this.frogger.y || _this.frogger.x <= obstacle.x && obstacle.x <= _this.frogger.x + _this.frogger.width && obstacle.y === _this.frogger.y) {
	          _this.loseLife();
	        }
	      });
	    }
	  }, {
	    key: 'checkForRiverCollision',
	    value: function checkForRiverCollision() {
	      var _this2 = this;
	
	      var collidingObstacle = this.obstaclesArray.find(function (obstacle) {
	
	        if (obstacle.x <= _this2.frogger.x && _this2.frogger.x <= obstacle.x + obstacle.width && obstacle.x <= _this2.frogger.x + _this2.frogger.width && _this2.frogger.x + _this2.frogger.width <= obstacle.x + obstacle.width && obstacle.y === _this2.frogger.y) {
	          return obstacle;
	        }
	      });
	
	      if (collidingObstacle !== undefined) {
	        this.frogRidesObstacle(collidingObstacle);
	      } else {
	        this.loseLife();
	      }
	    }
	  }, {
	    key: 'frogRidesObstacle',
	    value: function frogRidesObstacle(collidingObstacle) {
	      this.frogger.x += collidingObstacle.velocity;
	
	      if (this.frogger.x + this.frogger.width > 550 || this.frogger.x <= 0) {
	        this.loseLife();
	      }
	    }
	  }, {
	    key: 'loseLife',
	    value: function loseLife() {
	      this.frogger.lives--;
	      this.lanes.forEach(function (lane) {
	        return lane.reached = false;
	      });
	      this.updateLivesDisplay();
	
	      if (this.frogger.lives === 0) {
	        this.showGameOver();
	      } else {
	        this.showDeath();
	        this.restartLevel();
	      }
	    }
	  }, {
	    key: 'showDeath',
	    value: function showDeath() {
	      document.querySelector('.death').classList.remove('hide');
	      setTimeout(this.removeDeath, 1500);
	    }
	  }, {
	    key: 'removeDeath',
	    value: function removeDeath() {
	      document.querySelector('.death').classList.add('hide');
	    }
	  }, {
	    key: 'showGameOver',
	    value: function showGameOver() {
	      document.querySelector('.game-over').classList.remove('hide');
	      document.querySelector('.final-score').innerText = 'Final Score: ' + this.score;
	      setTimeout(this.newGame, 2500);
	    }
	  }, {
	    key: 'newGame',
	    value: function newGame() {
	      window.location.reload(true);
	    }
	  }, {
	    key: 'restartLevel',
	    value: function restartLevel() {
	      this.frogger.x = 250;
	      this.frogger.y = 600;
	      this.frogger.direction = 'up';
	    }
	  }, {
	    key: 'levelUp',
	    value: function levelUp() {
	      this.level++;
	      this.lanes.forEach(function (lane) {
	        return lane.reached = false;
	      });
	      this.showLevelUp();
	      this.updateLevelDisplay();
	      this.restartLevel();
	      this.increaseObstacleSpeed();
	    }
	  }, {
	    key: 'increaseObstacleSpeed',
	    value: function increaseObstacleSpeed() {
	      this.obstaclesArray.forEach(function (object) {
	        if (object.velocity < 0) {
	          object.velocity -= .5;
	        } else {
	          object.velocity += .5;
	        }
	      });
	    }
	  }, {
	    key: 'showLevelUp',
	    value: function showLevelUp() {
	      document.querySelector('.level-up').classList.remove('hide');
	      setTimeout(this.removeLevelUp, 1500);
	    }
	  }, {
	    key: 'removeLevelUp',
	    value: function removeLevelUp() {
	      document.querySelector('.level-up').classList.add('hide');
	    }
	  }, {
	    key: 'addScore',
	    value: function addScore() {
	      var _this3 = this;
	
	      this.lanes.forEach(function (lane) {
	        if (_this3.frogger.y === lane.height && lane.reached === false) {
	          lane.reached = true;
	          _this3.score += 10;
	        }
	      });
	      this.updateScoreDisplay();
	    }
	  }, {
	    key: 'updateScoreDisplay',
	    value: function updateScoreDisplay() {
	      document.querySelector('.score').innerText = 'Score: ' + this.score;
	    }
	  }, {
	    key: 'updateLevelDisplay',
	    value: function updateLevelDisplay() {
	      document.querySelector('.level').innerText = 'Level: ' + this.level;
	    }
	  }, {
	    key: 'updateLivesDisplay',
	    value: function updateLivesDisplay() {
	      document.querySelector('.lives').innerText = 'Lives: ' + this.frogger.lives;
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Frog = function () {
	  function Frog() {
	    _classCallCheck(this, Frog);
	
	    this.x = 250;
	    this.y = 600;
	    this.width = 50;
	    this.height = 50;
	    this.lives = 3;
	    this.velocity = 0;
	    this.direction = 'up';
	  }
	
	  _createClass(Frog, [{
	    key: 'drawFrog',
	    value: function drawFrog(ctx) {
	      var img = new Image();
	
	      img.src = './frog-icon-' + this.direction + '.png';
	      ctx.drawImage(img, this.x, this.y);
	    }
	  }, {
	    key: 'moveFrogUp',
	    value: function moveFrogUp() {
	      if (!(this.y === 0)) {
	        this.y -= 50;
	        this.direction = 'up';
	      }
	    }
	  }, {
	    key: 'moveFrogDown',
	    value: function moveFrogDown(canvasHeight) {
	      if (!(this.y === canvasHeight - this.height)) {
	        this.y += 50;
	        this.direction = 'down';
	      }
	    }
	  }, {
	    key: 'moveFrogRight',
	    value: function moveFrogRight(canvasWidth) {
	      if (!(this.x === canvasWidth - this.width)) {
	        this.x += 50;
	        this.direction = 'right';
	      }
	    }
	  }, {
	    key: 'moveFrogLeft',
	    value: function moveFrogLeft() {
	      if (!(this.x === 0)) {
	        this.x -= 50;
	        this.direction = 'left';
	      }
	    }
	  }]);
	
	  return Frog;
	}();
	
	module.exports = Frog;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = __webpack_require__(4);
	
	var Car = function (_Obstacle) {
	  _inherits(Car, _Obstacle);
	
	  function Car(x, y, velocity) {
	    _classCallCheck(this, Car);
	
	    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, x, y, velocity));
	
	    _this.type = 'car';
	    _this.width = 50;
	    return _this;
	  }
	
	  return Car;
	}(Obstacle);
	
	module.exports = Car;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Obstacle = function () {
	  function Obstacle(x, y, velocity) {
	    _classCallCheck(this, Obstacle);
	
	    this.x = x;
	    this.y = y;
	    this.height = 50;
	    this.velocity = velocity;
	  }
	
	  _createClass(Obstacle, [{
	    key: "drawSelf",
	    value: function drawSelf(ctx) {
	      var img = new Image();
	
	      img.src = "./" + this.type + ".png";
	      ctx.drawImage(img, this.x, this.y);
	    }
	  }, {
	    key: "moveObstacles",
	    value: function moveObstacles() {
	      if (this.x < 549 && this.velocity > 0) {
	        this.x += this.velocity;
	      } else if (this.x >= 549 && this.velocity > 0) {
	        this.x = -this.width;
	      }
	
	      if (this.x > -this.width + 1 && this.velocity < 0) {
	        this.x += this.velocity;
	      } else if (this.x <= -this.width + 1 && this.velocity < 0) {
	        this.x = 550;
	      }
	    }
	  }]);
	
	  return Obstacle;
	}();
	
	module.exports = Obstacle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = __webpack_require__(4);
	
	var Car2 = function (_Obstacle) {
	  _inherits(Car2, _Obstacle);
	
	  function Car2(x, y, velocity) {
	    _classCallCheck(this, Car2);
	
	    var _this = _possibleConstructorReturn(this, (Car2.__proto__ || Object.getPrototypeOf(Car2)).call(this, x, y, velocity));
	
	    _this.type = 'car2';
	    _this.width = 50;
	    return _this;
	  }
	
	  return Car2;
	}(Obstacle);
	
	module.exports = Car2;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = __webpack_require__(4);
	
	var Truck = function (_Obstacle) {
	  _inherits(Truck, _Obstacle);
	
	  function Truck(x, y, velocity) {
	    _classCallCheck(this, Truck);
	
	    var _this = _possibleConstructorReturn(this, (Truck.__proto__ || Object.getPrototypeOf(Truck)).call(this, x, y, velocity));
	
	    _this.type = 'truck';
	    _this.width = 150;
	    return _this;
	  }
	
	  return Truck;
	}(Obstacle);
	
	module.exports = Truck;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = __webpack_require__(4);
	
	var Log = function (_Obstacle) {
	  _inherits(Log, _Obstacle);
	
	  function Log(x, y, velocity) {
	    _classCallCheck(this, Log);
	
	    var _this = _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, x, y, velocity));
	
	    _this.type = 'log';
	    _this.width = 150;
	    return _this;
	  }
	
	  return Log;
	}(Obstacle);
	
	module.exports = Log;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Obstacle = __webpack_require__(4);
	
	var Turtle = function (_Obstacle) {
	  _inherits(Turtle, _Obstacle);
	
	  function Turtle(x, y, velocity) {
	    _classCallCheck(this, Turtle);
	
	    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, x, y, velocity));
	
	    _this.type = 'turtle';
	    _this.width = 100;
	    return _this;
	  }
	
	  return Turtle;
	}(Obstacle);
	
	module.exports = Turtle;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2UxYzBlYjkwM2E0MzhmMjliOTgiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9Gcm9nLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL09ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIyLmpzIiwid2VicGFjazovLy8uL2xpYi9UcnVjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvTG9nLmpzIiwid2VicGFjazovLy8uL2xpYi9UdXJ0bGUuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImdhbWUiLCJpbml0aWFsaXplR2FtZSIsImdhbWVMb29wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3T2JqZWN0cyIsImFuaW1hdGVPYnN0YWNsZXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRyb2xGcm9nIiwia2V5Q29kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJGcm9nIiwiQ2FyIiwiQ2FyMiIsIlRydWNrIiwiTG9nIiwiVHVydGxlIiwic2NvcmUiLCJsZXZlbCIsImZyb2dnZXIiLCJsYW5lcyIsInJlYWNoZWQiLCJ2ZWxvY2l0eSIsIm9ic3RhY2xlc0FycmF5IiwiZm9yRWFjaCIsIm9ic3RhY2xlIiwiZHJhd1NlbGYiLCJkcmF3RnJvZyIsIm1vdmVPYnN0YWNsZXMiLCJjaGVja0Zyb2dMb2NhdGlvbiIsInkiLCJjaGVja0ZvclJvYWRDb2xsaXNpb24iLCJjaGVja0ZvclJpdmVyQ29sbGlzaW9uIiwibGV2ZWxVcCIsImtleWNvZGUiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsIm1vdmVGcm9nVXAiLCJhZGRTY29yZSIsIm1vdmVGcm9nRG93biIsIm1vdmVGcm9nUmlnaHQiLCJtb3ZlRnJvZ0xlZnQiLCJ4IiwibG9zZUxpZmUiLCJjb2xsaWRpbmdPYnN0YWNsZSIsImZpbmQiLCJ1bmRlZmluZWQiLCJmcm9nUmlkZXNPYnN0YWNsZSIsImxpdmVzIiwibGFuZSIsInVwZGF0ZUxpdmVzRGlzcGxheSIsInNob3dHYW1lT3ZlciIsInNob3dEZWF0aCIsInJlc3RhcnRMZXZlbCIsInNldFRpbWVvdXQiLCJyZW1vdmVEZWF0aCIsImlubmVyVGV4dCIsIm5ld0dhbWUiLCJsb2NhdGlvbiIsInJlbG9hZCIsImRpcmVjdGlvbiIsInNob3dMZXZlbFVwIiwidXBkYXRlTGV2ZWxEaXNwbGF5IiwiaW5jcmVhc2VPYnN0YWNsZVNwZWVkIiwib2JqZWN0IiwicmVtb3ZlTGV2ZWxVcCIsInVwZGF0ZVNjb3JlRGlzcGxheSIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbWciLCJJbWFnZSIsInNyYyIsImRyYXdJbWFnZSIsIk9ic3RhY2xlIiwidHlwZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxPQUFPLG1CQUFBQyxDQUFRLENBQVIsQ0FBYjtBQUNBLEtBQU1DLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBLEtBQU1DLE1BQU1ILE9BQU9JLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUNBLEtBQUlDLGFBQUo7O0FBRUEsVUFBU0MsY0FBVCxHQUEwQjtBQUN4QkQsVUFBTyxJQUFJUCxJQUFK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QVo7QUFDQSxXQUFLL0UsS0FBTCxHQUFhLEdBQWI7QUFIMEI7QUFJM0I7OztHQUxlOEUsUTs7QUFTbEJOLFFBQU9DLE9BQVAsR0FBaUJyRCxHQUFqQixDOzs7Ozs7Ozs7Ozs7OztBQ1hBLEtBQU0wRCxXQUFXLG1CQUFBeEYsQ0FBUSxDQUFSLENBQWpCOztLQUVNK0IsTTs7O0FBQ0osbUJBQVkwQixDQUFaLEVBQWVaLENBQWYsRUFBa0JSLFFBQWxCLEVBQTRCO0FBQUE7O0FBQUEsaUhBQ3BCb0IsQ0FEb0IsRUFDakJaLENBRGlCLEVBQ2RSLFFBRGM7O0FBRTFCLFdBQUtvRCxJQUFMLEdBQVksUUFBWjtBQUNBLFdBQUsvRSxLQUFMLEdBQWEsR0FBYjtBQUgwQjtBQUkzQjs7O0dBTGtCOEUsUTs7QUFTckJOLFFBQU9DLE9BQVAsR0FBaUJwRCxNQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2UxYzBlYjkwM2E0MzhmMjliOTgiLCJjb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lLmpzJyk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmxldCBnYW1lXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICBnYW1lID0gbmV3IEdhbWUoKTtcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICBnYW1lLmRyYXdPYmplY3RzKGN0eCk7XG4gIGdhbWUuYW5pbWF0ZU9ic3RhY2xlcygpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgZ2FtZS5jb250cm9sRnJvZyhldmVudC5rZXlDb2RlLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gIGluaXRpYWxpemVHYW1lKCk7XG4gIGdhbWVMb29wKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1zY3JlZW4nKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXN0YXRzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSlcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjb25zdCBGcm9nID0gcmVxdWlyZSgnLi9Gcm9nLmpzJylcbmNvbnN0IENhciA9IHJlcXVpcmUoJy4vQ2FyLmpzJylcbmNvbnN0IENhcjIgPSByZXF1aXJlKCcuL0NhcjIuanMnKVxuY29uc3QgVHJ1Y2sgPSByZXF1aXJlKCcuL1RydWNrLmpzJylcbmNvbnN0IExvZyA9IHJlcXVpcmUoJy4vTG9nLmpzJylcbmNvbnN0IFR1cnRsZSA9IHJlcXVpcmUoJy4vVHVydGxlLmpzJylcbiAgXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2coKVxuICAgIHRoaXMubGFuZXMgPSBbXG4gICAgICB7aGVpZ2h0OiA1NTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMn0sXG4gICAgICB7aGVpZ2h0OiA1MDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTN9LFxuICAgICAge2hlaWdodDogNDUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDEuMjV9LFxuICAgICAge2hlaWdodDogNDAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC02fSxcbiAgICAgIHtoZWlnaHQ6IDM1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAxLjV9LFxuICAgICAge2hlaWdodDogMzAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDB9LFxuICAgICAge2hlaWdodDogMjUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC0yfSxcbiAgICAgIHtoZWlnaHQ6IDIwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAyLjV9LFxuICAgICAge2hlaWdodDogMTUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC0xfSxcbiAgICAgIHtoZWlnaHQ6IDEwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiA0LjV9LFxuICAgICAge2hlaWdodDogNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLS41fSxcbiAgICAgIHtoZWlnaHQ6IDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMH1cbiAgICBdXG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheSA9IFtcbiAgICAgIG5ldyBDYXIyKDAsIHRoaXMubGFuZXNbMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzBdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIyKDE1MCwgdGhpcy5sYW5lc1swXS5oZWlnaHQsIHRoaXMubGFuZXNbMF0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcig1MjUsIHRoaXMubGFuZXNbMV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzFdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMzc1LCB0aGlzLmxhbmVzWzFdLmhlaWdodCwgdGhpcy5sYW5lc1sxXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDIyNSwgdGhpcy5sYW5lc1sxXS5oZWlnaHQsIHRoaXMubGFuZXNbMV0udmVsb2NpdHkpLFxuICAgICAgbmV3IFRydWNrKDI1MCwgdGhpcy5sYW5lc1syXS5oZWlnaHQsIHRoaXMubGFuZXNbMl0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigyMjUsIHRoaXMubGFuZXNbM10uaGVpZ2h0LCB0aGlzLmxhbmVzWzNdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMzc1LCB0aGlzLmxhbmVzWzNdLmhlaWdodCwgdGhpcy5sYW5lc1szXS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soNDAwLCB0aGlzLmxhbmVzWzRdLmhlaWdodCwgdGhpcy5sYW5lc1s0XS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soMTI1LCB0aGlzLmxhbmVzWzRdLmhlaWdodCwgdGhpcy5sYW5lc1s0XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDMwMCwgdGhpcy5sYW5lc1s2XS5oZWlnaHQsIHRoaXMubGFuZXNbNl0udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgzMjUsIHRoaXMubGFuZXNbN10uaGVpZ2h0LCB0aGlzLmxhbmVzWzddLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUdXJ0bGUoMTUwLCB0aGlzLmxhbmVzWzddLmhlaWdodCwgdGhpcy5sYW5lc1s3XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDQwMCwgdGhpcy5sYW5lc1s4XS5oZWlnaHQsIHRoaXMubGFuZXNbOF0udmVsb2NpdHkpLFxuICAgICAgbmV3IExvZygxMDAsIHRoaXMubGFuZXNbOF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzhdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUdXJ0bGUoMTAwLCB0aGlzLmxhbmVzWzldLmhlaWdodCwgdGhpcy5sYW5lc1s5XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDQyNSwgdGhpcy5sYW5lc1sxMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzEwXS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDE3NSwgdGhpcy5sYW5lc1sxMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzEwXS52ZWxvY2l0eSlcbiAgICBdO1xuICAgIFxuICB9XG5cbiAgZHJhd09iamVjdHMoY3R4KSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9ic3RhY2xlID0+IHtcbiAgICAgIG9ic3RhY2xlLmRyYXdTZWxmKGN0eClcbiAgICB9KVxuICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZyhjdHgpO1xuICB9XG5cbiAgYW5pbWF0ZU9ic3RhY2xlcygpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JzdGFjbGUgPT4gb2JzdGFjbGUubW92ZU9ic3RhY2xlcygpKVxuICAgIHRoaXMuY2hlY2tGcm9nTG9jYXRpb24oKTsgIFxuICB9XG5cbiAgY2hlY2tGcm9nTG9jYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuZnJvZ2dlci55ID4gMzAwKSB7XG4gICAgICB0aGlzLmNoZWNrRm9yUm9hZENvbGxpc2lvbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mcm9nZ2VyLnkgPCAzMDAgJiYgdGhpcy5mcm9nZ2VyLnkgPj0gNTApIHtcbiAgICAgIHRoaXMuY2hlY2tGb3JSaXZlckNvbGxpc2lvbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mcm9nZ2VyLnkgPCA1MCkge1xuICAgICAgdGhpcy5sZXZlbFVwKCk7XG4gICAgfVxuICB9XG5cbiAgY29udHJvbEZyb2coa2V5Y29kZSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCkge1xuICAgIGlmIChrZXljb2RlID09PSAzOCkge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nVXAoKVxuICAgICAgdGhpcy5hZGRTY29yZSgpO1xuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gNDApIHtcbiAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlRnJvZ0Rvd24oY2FudmFzSGVpZ2h0KVxuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gMzkpIHtcbiAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlRnJvZ1JpZ2h0KGNhbnZhc1dpZHRoKVxuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gMzcpIHtcbiAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlRnJvZ0xlZnQoKVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9yUm9hZENvbGxpc2lvbigpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JzdGFjbGUgPT4ge1xuICAgICAgaWYgKChvYnN0YWNsZS54IDw9IHRoaXMuZnJvZ2dlci54IFxuICAgICAgICAmJiB0aGlzLmZyb2dnZXIueCA8PSAob2JzdGFjbGUueCArIG9ic3RhY2xlLndpZHRoKVxuICAgICAgICAmJiBvYnN0YWNsZS55ID09PSB0aGlzLmZyb2dnZXIueSkgXG4gICAgICAgIHx8ICh0aGlzLmZyb2dnZXIueCA8PSBvYnN0YWNsZS54XG4gICAgICAgICYmIG9ic3RhY2xlLnggPD0gKHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoKVxuICAgICAgICAmJiBvYnN0YWNsZS55ID09PSB0aGlzLmZyb2dnZXIueSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvc2VMaWZlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY2hlY2tGb3JSaXZlckNvbGxpc2lvbigpIHtcbiAgICBsZXQgY29sbGlkaW5nT2JzdGFjbGUgPSB0aGlzLm9ic3RhY2xlc0FycmF5LmZpbmQob2JzdGFjbGUgPT4ge1xuICAgICAgXG4gICAgICBpZiAoKG9ic3RhY2xlLnggPD0gdGhpcy5mcm9nZ2VyLngpIFxuICAgICAgICAmJiAodGhpcy5mcm9nZ2VyLnggPD0gb2JzdGFjbGUueCArIG9ic3RhY2xlLndpZHRoKVxuICAgICAgICAmJiAob2JzdGFjbGUueCA8PSB0aGlzLmZyb2dnZXIueCArIHRoaXMuZnJvZ2dlci53aWR0aClcbiAgICAgICAgJiYgKHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoIDw9IG9ic3RhY2xlLnggKyBvYnN0YWNsZS53aWR0aClcbiAgICAgICAgJiYgKG9ic3RhY2xlLnkgPT09IHRoaXMuZnJvZ2dlci55KSBcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gb2JzdGFjbGVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKGNvbGxpZGluZ09ic3RhY2xlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZnJvZ1JpZGVzT2JzdGFjbGUoY29sbGlkaW5nT2JzdGFjbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvc2VMaWZlKClcbiAgICB9XG4gICAgXG4gIH1cblxuICBmcm9nUmlkZXNPYnN0YWNsZShjb2xsaWRpbmdPYnN0YWNsZSkge1xuICAgIHRoaXMuZnJvZ2dlci54ICs9IGNvbGxpZGluZ09ic3RhY2xlLnZlbG9jaXR5XG4gICAgXG4gICAgaWYgKHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoID4gNTUwIHx8XG4gICAgICAgIHRoaXMuZnJvZ2dlci54IDw9IDApIHtcbiAgICAgIHRoaXMubG9zZUxpZmUoKSAgICBcbiAgICB9XG5cbiAgfVxuXG4gIGxvc2VMaWZlKCkge1xuICAgIHRoaXMuZnJvZ2dlci5saXZlcy0tO1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IGxhbmUucmVhY2hlZCA9IGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUxpdmVzRGlzcGxheSgpO1xuXG4gICAgaWYgKHRoaXMuZnJvZ2dlci5saXZlcyA9PT0gMCkge1xuICAgICAgdGhpcy5zaG93R2FtZU92ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RGVhdGgoKTtcbiAgICAgIHRoaXMucmVzdGFydExldmVsKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0RlYXRoKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWF0aCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlRGVhdGgsIDE1MDApO1xuICB9XG5cbiAgcmVtb3ZlRGVhdGgoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlYXRoJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9XG5cbiAgc2hvd0dhbWVPdmVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW92ZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbmFsLXNjb3JlJykuaW5uZXJUZXh0ID0gXG4gICAgICBgRmluYWwgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICAgIHNldFRpbWVvdXQodGhpcy5uZXdHYW1lLCAyNTAwKTtcbiAgfVxuXG4gIG5ld0dhbWUoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgfVxuXG4gIHJlc3RhcnRMZXZlbCgpIHtcbiAgICB0aGlzLmZyb2dnZXIueCA9IDI1MDtcbiAgICB0aGlzLmZyb2dnZXIueSA9IDYwMDtcbiAgICB0aGlzLmZyb2dnZXIuZGlyZWN0aW9uID0gJ3VwJztcbiAgfVxuXG4gIGxldmVsVXAoKSB7XG4gICAgdGhpcy5sZXZlbCsrO1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IGxhbmUucmVhY2hlZCA9IGZhbHNlKTtcbiAgICB0aGlzLnNob3dMZXZlbFVwKCk7XG4gICAgdGhpcy51cGRhdGVMZXZlbERpc3BsYXkoKTtcbiAgICB0aGlzLnJlc3RhcnRMZXZlbCgpO1xuICAgIHRoaXMuaW5jcmVhc2VPYnN0YWNsZVNwZWVkKCk7XG4gIH1cblxuICBpbmNyZWFzZU9ic3RhY2xlU3BlZWQoKSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9iamVjdCA9PiB7XG4gICAgICBpZiAob2JqZWN0LnZlbG9jaXR5IDwgMCkge1xuICAgICAgICBvYmplY3QudmVsb2NpdHkgLT0gLjU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3QudmVsb2NpdHkgKz0gLjU7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNob3dMZXZlbFVwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbC11cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlTGV2ZWxVcCwgMTUwMCk7XG4gIH1cblxuICByZW1vdmVMZXZlbFVwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbC11cCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfVxuXG4gIGFkZFNjb3JlKCkge1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IHtcbiAgICAgIGlmICh0aGlzLmZyb2dnZXIueSA9PT0gbGFuZS5oZWlnaHQgJiYgbGFuZS5yZWFjaGVkID09PSBmYWxzZSkge1xuICAgICAgICBsYW5lLnJlYWNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3JlICs9IDEwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlU2NvcmVEaXNwbGF5KCk7XG4gIH1cblxuICB1cGRhdGVTY29yZURpc3BsYXkoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJykuaW5uZXJUZXh0ID0gYFNjb3JlOiAke3RoaXMuc2NvcmV9YDtcbiAgfVxuXG4gIHVwZGF0ZUxldmVsRGlzcGxheSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGV2ZWwnKS5pbm5lclRleHQgPSBgTGV2ZWw6ICR7dGhpcy5sZXZlbH1gO1xuICB9XG5cbiAgdXBkYXRlTGl2ZXNEaXNwbGF5KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcycpLmlubmVyVGV4dCA9IGBMaXZlczogJHt0aGlzLmZyb2dnZXIubGl2ZXN9YDtcbiAgfVxuXG59XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNsYXNzIEZyb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnggPSAyNTA7XG4gICAgdGhpcy55ID0gNjAwO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIHRoaXMudmVsb2NpdHkgPSAwO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgfVxuXG4gIGRyYXdGcm9nKGN0eCkge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaW1nLnNyYyA9IGAuL2Zyb2ctaWNvbi0ke3RoaXMuZGlyZWN0aW9ufS5wbmdgO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCB0aGlzLngsIHRoaXMueSk7XG5cbiAgfVxuXG4gIG1vdmVGcm9nVXAoKSB7XG4gICAgaWYgKCEodGhpcy55ID09PSAwKSkge1xuICAgICAgdGhpcy55IC09IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGcm9nRG93bihjYW52YXNIZWlnaHQpIHtcbiAgICBpZiAoISh0aGlzLnkgPT09IGNhbnZhc0hlaWdodCAtIHRoaXMuaGVpZ2h0KSkge1xuICAgICAgdGhpcy55ICs9IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZyb2dSaWdodChjYW52YXNXaWR0aCkge1xuICAgIGlmICghKHRoaXMueCA9PT0gY2FudmFzV2lkdGggLSB0aGlzLndpZHRoKSkge1xuICAgICAgdGhpcy54ICs9IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGcm9nTGVmdCgpIHtcbiAgICBpZiAoISh0aGlzLnggPT09IDApKSB7XG4gICAgICB0aGlzLnggLT0gNTA7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICB9XG4gIH1cbiAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJvZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9Gcm9nLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBDYXIgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICdjYXInO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0Nhci5qcyIsImNsYXNzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gIH1cblxuICBkcmF3U2VsZihjdHgpIHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGltZy5zcmMgPSBgLi8ke3RoaXMudHlwZX0ucG5nYDtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgbW92ZU9ic3RhY2xlcygpIHtcbiAgICBpZiAodGhpcy54IDwgNTQ5ICYmIHRoaXMudmVsb2NpdHkgPiAwKSB7XG4gICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eTtcbiAgICB9IGVsc2UgaWYgKHRoaXMueCA+PSA1NDkgJiYgdGhpcy52ZWxvY2l0eSA+IDApIHtcbiAgICAgIHRoaXMueCA9IC10aGlzLndpZHRoO1xuICAgIH0gXG5cbiAgICBpZiAodGhpcy54ID4gLXRoaXMud2lkdGggKyAxICYmIHRoaXMudmVsb2NpdHkgPCAwKSB7XG4gICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eTtcbiAgICB9IGVsc2UgaWYgKHRoaXMueCA8PSAtdGhpcy53aWR0aCArIDEgJiYgdGhpcy52ZWxvY2l0eSA8IDApIHtcbiAgICAgIHRoaXMueCA9IDU1MDtcbiAgICB9XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL09ic3RhY2xlLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBDYXIyIGV4dGVuZHMgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHN1cGVyKHgsIHksIHZlbG9jaXR5KTtcbiAgICB0aGlzLnR5cGUgPSAnY2FyMic7XG4gICAgdGhpcy53aWR0aCA9IDUwO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDYXIyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9DYXIyLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBUcnVjayBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ3RydWNrJztcbiAgICB0aGlzLndpZHRoID0gMTUwO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBUcnVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvVHJ1Y2suanMiLCJjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoJy4uL2xpYi9PYnN0YWNsZS5qcycpXG5cbmNsYXNzIExvZyBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ2xvZyc7XG4gICAgdGhpcy53aWR0aCA9IDE1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9Mb2cuanMiLCJjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoJy4uL2xpYi9PYnN0YWNsZS5qcycpXG5cbmNsYXNzIFR1cnRsZSBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ3R1cnRsZSc7XG4gICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVHVydGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9UdXJ0bGUuanMiXSwic291cmNlUm9vdCI6IiJ9