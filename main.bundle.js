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
	
	      img.src = './assets/frog-icon-' + this.direction + '.png';
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
	
	      img.src = "./assets/" + this.type + ".png";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTkwZjVkYTRlOTE0MjAwMjk5ZGIiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9Gcm9nLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL09ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIyLmpzIiwid2VicGFjazovLy8uL2xpYi9UcnVjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvTG9nLmpzIiwid2VicGFjazovLy8uL2xpYi9UdXJ0bGUuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImdhbWUiLCJpbml0aWFsaXplR2FtZSIsImdhbWVMb29wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3T2JqZWN0cyIsImFuaW1hdGVPYnN0YWNsZXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRyb2xGcm9nIiwia2V5Q29kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJGcm9nIiwiQ2FyIiwiQ2FyMiIsIlRydWNrIiwiTG9nIiwiVHVydGxlIiwic2NvcmUiLCJsZXZlbCIsImZyb2dnZXIiLCJsYW5lcyIsInJlYWNoZWQiLCJ2ZWxvY2l0eSIsIm9ic3RhY2xlc0FycmF5IiwiZm9yRWFjaCIsIm9ic3RhY2xlIiwiZHJhd1NlbGYiLCJkcmF3RnJvZyIsIm1vdmVPYnN0YWNsZXMiLCJjaGVja0Zyb2dMb2NhdGlvbiIsInkiLCJjaGVja0ZvclJvYWRDb2xsaXNpb24iLCJjaGVja0ZvclJpdmVyQ29sbGlzaW9uIiwibGV2ZWxVcCIsImtleWNvZGUiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsIm1vdmVGcm9nVXAiLCJhZGRTY29yZSIsIm1vdmVGcm9nRG93biIsIm1vdmVGcm9nUmlnaHQiLCJtb3ZlRnJvZ0xlZnQiLCJ4IiwibG9zZUxpZmUiLCJjb2xsaWRpbmdPYnN0YWNsZSIsImZpbmQiLCJ1bmRlZmluZWQiLCJmcm9nUmlkZXNPYnN0YWNsZSIsImxpdmVzIiwibGFuZSIsInVwZGF0ZUxpdmVzRGlzcGxheSIsInNob3dHYW1lT3ZlciIsInNob3dEZWF0aCIsInJlc3RhcnRMZXZlbCIsInNldFRpbWVvdXQiLCJyZW1vdmVEZWF0aCIsImlubmVyVGV4dCIsIm5ld0dhbWUiLCJsb2NhdGlvbiIsInJlbG9hZCIsImRpcmVjdGlvbiIsInNob3dMZXZlbFVwIiwidXBkYXRlTGV2ZWxEaXNwbGF5IiwiaW5jcmVhc2VPYnN0YWNsZVNwZWVkIiwib2JqZWN0IiwicmVtb3ZlTGV2ZWxVcCIsInVwZGF0ZVNjb3JlRGlzcGxheSIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbWciLCJJbWFnZSIsInNyYyIsImRyYXdJbWFnZSIsIk9ic3RhY2xlIiwidHlwZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxPQUFPLG1CQUFBQyxDQUFRLENBQVIsQ0FBYjtBQUNBLEtBQU1DLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBLEtBQU1DLE1BQU1ILE9BQU9JLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUNBLEtBQUlDLGFBQUo7O0FBRUEsVUFBU0MsY0FBVCxHQUEwQjtBQUN4QkQsVUFBTyxJQUFJUCxJQUFK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S0FBWjtBQUNBLFdBQUsvRSxLQUFMLEdBQWEsR0FBYjtBQUgwQjtBQUkzQjs7O0dBTGU4RSxROztBQVNsQk4sUUFBT0MsT0FBUCxHQUFpQnJELEdBQWpCLEM7Ozs7Ozs7Ozs7Ozs7O0FDWEEsS0FBTTBELFdBQVcsbUJBQUF4RixDQUFRLENBQVIsQ0FBakI7O0tBRU0rQixNOzs7QUFDSixtQkFBWTBCLENBQVosRUFBZVosQ0FBZixFQUFrQlIsUUFBbEIsRUFBNEI7QUFBQTs7QUFBQSxpSEFDcEJvQixDQURvQixFQUNqQlosQ0FEaUIsRUFDZFIsUUFEYzs7QUFFMUIsV0FBS29ELElBQUwsR0FBWSxRQUFaO0FBQ0EsV0FBSy9FLEtBQUwsR0FBYSxHQUFiO0FBSDBCO0FBSTNCOzs7R0FMa0I4RSxROztBQVNyQk4sUUFBT0MsT0FBUCxHQUFpQnBELE1BQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxOTBmNWRhNGU5MTQyMDAyOTlkYiIsImNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUuanMnKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xubGV0IGdhbWVcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XG4gIGdhbWUgPSBuZXcgR2FtZSgpO1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIGdhbWUuZHJhd09iamVjdHMoY3R4KTtcbiAgZ2FtZS5hbmltYXRlT2JzdGFjbGVzKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBnYW1lLmNvbnRyb2xGcm9nKGV2ZW50LmtleUNvZGUsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgaW5pdGlhbGl6ZUdhbWUoKTtcbiAgZ2FtZUxvb3AoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LXNjcmVlbicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhdHMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG59KVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNvbnN0IEZyb2cgPSByZXF1aXJlKCcuL0Zyb2cuanMnKVxuY29uc3QgQ2FyID0gcmVxdWlyZSgnLi9DYXIuanMnKVxuY29uc3QgQ2FyMiA9IHJlcXVpcmUoJy4vQ2FyMi5qcycpXG5jb25zdCBUcnVjayA9IHJlcXVpcmUoJy4vVHJ1Y2suanMnKVxuY29uc3QgTG9nID0gcmVxdWlyZSgnLi9Mb2cuanMnKVxuY29uc3QgVHVydGxlID0gcmVxdWlyZSgnLi9UdXJ0bGUuanMnKVxuICBcbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxldmVsID0gMTtcbiAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZygpXG4gICAgdGhpcy5sYW5lcyA9IFtcbiAgICAgIHtoZWlnaHQ6IDU1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAyfSxcbiAgICAgIHtoZWlnaHQ6IDUwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAtM30sXG4gICAgICB7aGVpZ2h0OiA0NTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMS4yNX0sXG4gICAgICB7aGVpZ2h0OiA0MDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTZ9LFxuICAgICAge2hlaWdodDogMzUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDEuNX0sXG4gICAgICB7aGVpZ2h0OiAzMDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMH0sXG4gICAgICB7aGVpZ2h0OiAyNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTJ9LFxuICAgICAge2hlaWdodDogMjAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDIuNX0sXG4gICAgICB7aGVpZ2h0OiAxNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTF9LFxuICAgICAge2hlaWdodDogMTAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDQuNX0sXG4gICAgICB7aGVpZ2h0OiA1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAtLjV9LFxuICAgICAge2hlaWdodDogMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAwfVxuICAgIF1cbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5ID0gW1xuICAgICAgbmV3IENhcjIoMCwgdGhpcy5sYW5lc1swXS5oZWlnaHQsIHRoaXMubGFuZXNbMF0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcjIoMTUwLCB0aGlzLmxhbmVzWzBdLmhlaWdodCwgdGhpcy5sYW5lc1swXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDUyNSwgdGhpcy5sYW5lc1sxXS5oZWlnaHQsIHRoaXMubGFuZXNbMV0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigzNzUsIHRoaXMubGFuZXNbMV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzFdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMjI1LCB0aGlzLmxhbmVzWzFdLmhlaWdodCwgdGhpcy5sYW5lc1sxXS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soMjUwLCB0aGlzLmxhbmVzWzJdLmhlaWdodCwgdGhpcy5sYW5lc1syXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDIyNSwgdGhpcy5sYW5lc1szXS5oZWlnaHQsIHRoaXMubGFuZXNbM10udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigzNzUsIHRoaXMubGFuZXNbM10uaGVpZ2h0LCB0aGlzLmxhbmVzWzNdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUcnVjayg0MDAsIHRoaXMubGFuZXNbNF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzRdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUcnVjaygxMjUsIHRoaXMubGFuZXNbNF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzRdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coMzAwLCB0aGlzLmxhbmVzWzZdLmhlaWdodCwgdGhpcy5sYW5lc1s2XS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHVydGxlKDMyNSwgdGhpcy5sYW5lc1s3XS5oZWlnaHQsIHRoaXMubGFuZXNbN10udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgxNTAsIHRoaXMubGFuZXNbN10uaGVpZ2h0LCB0aGlzLmxhbmVzWzddLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coNDAwLCB0aGlzLmxhbmVzWzhdLmhlaWdodCwgdGhpcy5sYW5lc1s4XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDEwMCwgdGhpcy5sYW5lc1s4XS5oZWlnaHQsIHRoaXMubGFuZXNbOF0udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgxMDAsIHRoaXMubGFuZXNbOV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzldLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coNDI1LCB0aGlzLmxhbmVzWzEwXS5oZWlnaHQsIHRoaXMubGFuZXNbMTBdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coMTc1LCB0aGlzLmxhbmVzWzEwXS5oZWlnaHQsIHRoaXMubGFuZXNbMTBdLnZlbG9jaXR5KVxuICAgIF07XG4gICAgXG4gIH1cblxuICBkcmF3T2JqZWN0cyhjdHgpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JzdGFjbGUgPT4ge1xuICAgICAgb2JzdGFjbGUuZHJhd1NlbGYoY3R4KVxuICAgIH0pXG4gICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nKGN0eCk7XG4gIH1cblxuICBhbmltYXRlT2JzdGFjbGVzKCkge1xuICAgIHRoaXMub2JzdGFjbGVzQXJyYXkuZm9yRWFjaChvYnN0YWNsZSA9PiBvYnN0YWNsZS5tb3ZlT2JzdGFjbGVzKCkpXG4gICAgdGhpcy5jaGVja0Zyb2dMb2NhdGlvbigpOyAgXG4gIH1cblxuICBjaGVja0Zyb2dMb2NhdGlvbigpIHtcbiAgICBpZiAodGhpcy5mcm9nZ2VyLnkgPiAzMDApIHtcbiAgICAgIHRoaXMuY2hlY2tGb3JSb2FkQ29sbGlzaW9uKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyb2dnZXIueSA8IDMwMCAmJiB0aGlzLmZyb2dnZXIueSA+PSA1MCkge1xuICAgICAgdGhpcy5jaGVja0ZvclJpdmVyQ29sbGlzaW9uKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyb2dnZXIueSA8IDUwKSB7XG4gICAgICB0aGlzLmxldmVsVXAoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sRnJvZyhrZXljb2RlLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KSB7XG4gICAgaWYgKGtleWNvZGUgPT09IDM4KSB7XG4gICAgICB0aGlzLmZyb2dnZXIubW92ZUZyb2dVcCgpXG4gICAgICB0aGlzLmFkZFNjb3JlKCk7XG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSA0MCkge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nRG93bihjYW52YXNIZWlnaHQpXG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSAzOSkge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nUmlnaHQoY2FudmFzV2lkdGgpXG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSAzNykge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nTGVmdCgpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tGb3JSb2FkQ29sbGlzaW9uKCkge1xuICAgIHRoaXMub2JzdGFjbGVzQXJyYXkuZm9yRWFjaChvYnN0YWNsZSA9PiB7XG4gICAgICBpZiAoKG9ic3RhY2xlLnggPD0gdGhpcy5mcm9nZ2VyLnggXG4gICAgICAgICYmIHRoaXMuZnJvZ2dlci54IDw9IChvYnN0YWNsZS54ICsgb2JzdGFjbGUud2lkdGgpXG4gICAgICAgICYmIG9ic3RhY2xlLnkgPT09IHRoaXMuZnJvZ2dlci55KSBcbiAgICAgICAgfHwgKHRoaXMuZnJvZ2dlci54IDw9IG9ic3RhY2xlLnhcbiAgICAgICAgJiYgb2JzdGFjbGUueCA8PSAodGhpcy5mcm9nZ2VyLnggKyB0aGlzLmZyb2dnZXIud2lkdGgpXG4gICAgICAgICYmIG9ic3RhY2xlLnkgPT09IHRoaXMuZnJvZ2dlci55KVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9zZUxpZmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjaGVja0ZvclJpdmVyQ29sbGlzaW9uKCkge1xuICAgIGxldCBjb2xsaWRpbmdPYnN0YWNsZSA9IHRoaXMub2JzdGFjbGVzQXJyYXkuZmluZChvYnN0YWNsZSA9PiB7XG4gICAgICBcbiAgICAgIGlmICgob2JzdGFjbGUueCA8PSB0aGlzLmZyb2dnZXIueCkgXG4gICAgICAgICYmICh0aGlzLmZyb2dnZXIueCA8PSBvYnN0YWNsZS54ICsgb2JzdGFjbGUud2lkdGgpXG4gICAgICAgICYmIChvYnN0YWNsZS54IDw9IHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoKVxuICAgICAgICAmJiAodGhpcy5mcm9nZ2VyLnggKyB0aGlzLmZyb2dnZXIud2lkdGggPD0gb2JzdGFjbGUueCArIG9ic3RhY2xlLndpZHRoKVxuICAgICAgICAmJiAob2JzdGFjbGUueSA9PT0gdGhpcy5mcm9nZ2VyLnkpIFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBvYnN0YWNsZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoY29sbGlkaW5nT2JzdGFjbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5mcm9nUmlkZXNPYnN0YWNsZShjb2xsaWRpbmdPYnN0YWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9zZUxpZmUoKVxuICAgIH1cbiAgICBcbiAgfVxuXG4gIGZyb2dSaWRlc09ic3RhY2xlKGNvbGxpZGluZ09ic3RhY2xlKSB7XG4gICAgdGhpcy5mcm9nZ2VyLnggKz0gY29sbGlkaW5nT2JzdGFjbGUudmVsb2NpdHlcbiAgICBcbiAgICBpZiAodGhpcy5mcm9nZ2VyLnggKyB0aGlzLmZyb2dnZXIud2lkdGggPiA1NTAgfHxcbiAgICAgICAgdGhpcy5mcm9nZ2VyLnggPD0gMCkge1xuICAgICAgdGhpcy5sb3NlTGlmZSgpICAgIFxuICAgIH1cblxuICB9XG5cbiAgbG9zZUxpZmUoKSB7XG4gICAgdGhpcy5mcm9nZ2VyLmxpdmVzLS07XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4gbGFuZS5yZWFjaGVkID0gZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlTGl2ZXNEaXNwbGF5KCk7XG5cbiAgICBpZiAodGhpcy5mcm9nZ2VyLmxpdmVzID09PSAwKSB7XG4gICAgICB0aGlzLnNob3dHYW1lT3ZlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEZWF0aCgpO1xuICAgICAgdGhpcy5yZXN0YXJ0TGV2ZWwoKTtcbiAgICB9XG4gIH1cblxuICBzaG93RGVhdGgoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlYXRoJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVEZWF0aCwgMTUwMCk7XG4gIH1cblxuICByZW1vdmVEZWF0aCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVhdGgnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH1cblxuICBzaG93R2FtZU92ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWwtc2NvcmUnKS5pbm5lclRleHQgPSBcbiAgICAgIGBGaW5hbCBTY29yZTogJHt0aGlzLnNjb3JlfWA7XG4gICAgc2V0VGltZW91dCh0aGlzLm5ld0dhbWUsIDI1MDApO1xuICB9XG5cbiAgbmV3R2FtZSgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICB9XG5cbiAgcmVzdGFydExldmVsKCkge1xuICAgIHRoaXMuZnJvZ2dlci54ID0gMjUwO1xuICAgIHRoaXMuZnJvZ2dlci55ID0gNjAwO1xuICAgIHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24gPSAndXAnO1xuICB9XG5cbiAgbGV2ZWxVcCgpIHtcbiAgICB0aGlzLmxldmVsKys7XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4gbGFuZS5yZWFjaGVkID0gZmFsc2UpO1xuICAgIHRoaXMuc2hvd0xldmVsVXAoKTtcbiAgICB0aGlzLnVwZGF0ZUxldmVsRGlzcGxheSgpO1xuICAgIHRoaXMucmVzdGFydExldmVsKCk7XG4gICAgdGhpcy5pbmNyZWFzZU9ic3RhY2xlU3BlZWQoKTtcbiAgfVxuXG4gIGluY3JlYXNlT2JzdGFjbGVTcGVlZCgpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgIGlmIChvYmplY3QudmVsb2NpdHkgPCAwKSB7XG4gICAgICAgIG9iamVjdC52ZWxvY2l0eSAtPSAuNTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdC52ZWxvY2l0eSArPSAuNTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2hvd0xldmVsVXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxldmVsLXVwJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVMZXZlbFVwLCAxNTAwKTtcbiAgfVxuXG4gIHJlbW92ZUxldmVsVXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxldmVsLXVwJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9XG5cbiAgYWRkU2NvcmUoKSB7XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4ge1xuICAgICAgaWYgKHRoaXMuZnJvZ2dlci55ID09PSBsYW5lLmhlaWdodCAmJiBsYW5lLnJlYWNoZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGxhbmUucmVhY2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVTY29yZURpc3BsYXkoKTtcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlRGlzcGxheSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKS5pbm5lclRleHQgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICB9XG5cbiAgdXBkYXRlTGV2ZWxEaXNwbGF5KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbCcpLmlubmVyVGV4dCA9IGBMZXZlbDogJHt0aGlzLmxldmVsfWA7XG4gIH1cblxuICB1cGRhdGVMaXZlc0Rpc3BsYXkoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdmVzJykuaW5uZXJUZXh0ID0gYExpdmVzOiAke3RoaXMuZnJvZ2dlci5saXZlc31gO1xuICB9XG5cbn1cblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgRnJvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMueCA9IDI1MDtcbiAgICB0aGlzLnkgPSA2MDA7XG4gICAgdGhpcy53aWR0aCA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gICAgdGhpcy52ZWxvY2l0eSA9IDA7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICB9XG5cbiAgZHJhd0Zyb2coY3R4KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gYC4vYXNzZXRzL2Zyb2ctaWNvbi0ke3RoaXMuZGlyZWN0aW9ufS5wbmdgO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCB0aGlzLngsIHRoaXMueSk7XG5cbiAgfVxuXG4gIG1vdmVGcm9nVXAoKSB7XG4gICAgaWYgKCEodGhpcy55ID09PSAwKSkge1xuICAgICAgdGhpcy55IC09IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGcm9nRG93bihjYW52YXNIZWlnaHQpIHtcbiAgICBpZiAoISh0aGlzLnkgPT09IGNhbnZhc0hlaWdodCAtIHRoaXMuaGVpZ2h0KSkge1xuICAgICAgdGhpcy55ICs9IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZyb2dSaWdodChjYW52YXNXaWR0aCkge1xuICAgIGlmICghKHRoaXMueCA9PT0gY2FudmFzV2lkdGggLSB0aGlzLndpZHRoKSkge1xuICAgICAgdGhpcy54ICs9IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGcm9nTGVmdCgpIHtcbiAgICBpZiAoISh0aGlzLnggPT09IDApKSB7XG4gICAgICB0aGlzLnggLT0gNTA7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICB9XG4gIH1cbiAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJvZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9Gcm9nLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBDYXIgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICdjYXInO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0Nhci5qcyIsImNsYXNzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gIH1cblxuICBkcmF3U2VsZihjdHgpIHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGltZy5zcmMgPSBgLi9hc3NldHMvJHt0aGlzLnR5cGV9LnBuZ2A7XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIG1vdmVPYnN0YWNsZXMoKSB7XG4gICAgaWYgKHRoaXMueCA8IDU0OSAmJiB0aGlzLnZlbG9jaXR5ID4gMCkge1xuICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnggPj0gNTQ5ICYmIHRoaXMudmVsb2NpdHkgPiAwKSB7XG4gICAgICB0aGlzLnggPSAtdGhpcy53aWR0aDtcbiAgICB9IFxuXG4gICAgaWYgKHRoaXMueCA+IC10aGlzLndpZHRoICsgMSAmJiB0aGlzLnZlbG9jaXR5IDwgMCkge1xuICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnggPD0gLXRoaXMud2lkdGggKyAxICYmIHRoaXMudmVsb2NpdHkgPCAwKSB7XG4gICAgICB0aGlzLnggPSA1NTA7XG4gICAgfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9PYnN0YWNsZS5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgQ2FyMiBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ2NhcjInO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyMjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQ2FyMi5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgVHJ1Y2sgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICd0cnVjayc7XG4gICAgdGhpcy53aWR0aCA9IDE1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVHJ1Y2s7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1RydWNrLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBMb2cgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICdsb2cnO1xuICAgIHRoaXMud2lkdGggPSAxNTA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvTG9nLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBUdXJ0bGUgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICd0dXJ0bGUnO1xuICAgIHRoaXMud2lkdGggPSAxMDA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFR1cnRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvVHVydGxlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==