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
	  game.controlFrog(event.keyCode);
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
	
	    this.gameWidth = 550;
	    this.gameHeight = 650;
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
	      if (this.frogger.y > this.lanes[5].height) {
	        this.checkForRoadCollision();
	      } else if (this.frogger.y < this.lanes[5].height && this.frogger.y >= 50) {
	        this.checkForRiverCollision();
	      } else if (this.frogger.y < 50) {
	        this.levelUp();
	      }
	    }
	  }, {
	    key: 'controlFrog',
	    value: function controlFrog(keycode) {
	      if (keycode === 38) {
	        this.frogger.moveFrogUp();
	        this.addScore();
	      } else if (keycode === 40) {
	        this.frogger.moveFrogDown(this.gameHeight);
	      } else if (keycode === 39) {
	        this.frogger.moveFrogRight(this.gameWidth);
	      } else if (keycode === 37) {
	        this.frogger.moveFrogLeft();
	      }
	    }
	  }, {
	    key: 'checkForRoadCollision',
	    value: function checkForRoadCollision() {
	      var _this = this;
	
	      this.obstaclesArray.forEach(function (obstacle) {
	        var frogLeft = _this.frogger.x;
	        var frogRight = _this.frogger.x + _this.frogger.width;
	        var obstacleLeft = obstacle.x;
	        var obstacleRight = obstacle.x + obstacle.width;
	
	        if (obstacleLeft <= frogLeft && frogLeft <= obstacleRight && obstacle.y === _this.frogger.y || frogLeft <= obstacleLeft && obstacleLeft <= frogRight && obstacle.y === _this.frogger.y) {
	          _this.loseLife();
	        }
	      });
	    }
	  }, {
	    key: 'checkForRiverCollision',
	    value: function checkForRiverCollision() {
	      var _this2 = this;
	
	      var collidingObstacle = this.obstaclesArray.find(function (obstacle) {
	        var frogLeft = _this2.frogger.x;
	        var frogRight = _this2.frogger.x + _this2.frogger.width;
	        var obstacleLeft = obstacle.x - 10;
	        var obstacleRight = obstacle.x + obstacle.width + 10;
	
	        if (obstacleLeft <= frogLeft && frogLeft <= obstacleRight && obstacleLeft <= frogRight && frogRight <= obstacleRight && obstacle.y === _this2.frogger.y) {
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
	      var frogLeft = this.frogger.x;
	      var frogRight = this.frogger.x + this.frogger.width;
	
	      this.frogger.x += collidingObstacle.velocity;
	
	      if (frogRight > this.gameWidth || frogLeft <= 0) {
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
	    value: function moveFrogDown(gameHeight) {
	      if (!(this.y === gameHeight - this.height)) {
	        this.y += 50;
	        this.direction = 'down';
	      }
	    }
	  }, {
	    key: 'moveFrogRight',
	    value: function moveFrogRight(gameWidth) {
	      if (!(this.x === gameWidth - this.width)) {
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
	      var gameWidth = 550;
	
	      if (this.x < gameWidth - 1 && this.velocity > 0) {
	        this.x += this.velocity;
	      } else if (this.x >= gameWidth - 1 && this.velocity > 0) {
	        this.x = -this.width;
	      }
	
	      if (this.x > -this.width + 1 && this.velocity < 0) {
	        this.x += this.velocity;
	      } else if (this.x <= -this.width + 1 && this.velocity < 0) {
	        this.x = gameWidth;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzYWU4NTQ3OTY3NzM2NWZhODIiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9Gcm9nLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL09ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIyLmpzIiwid2VicGFjazovLy8uL2xpYi9UcnVjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvTG9nLmpzIiwid2VicGFjazovLy8uL2xpYi9UdXJ0bGUuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImdhbWUiLCJpbml0aWFsaXplR2FtZSIsImdhbWVMb29wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3T2JqZWN0cyIsImFuaW1hdGVPYnN0YWNsZXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRyb2xGcm9nIiwia2V5Q29kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJGcm9nIiwiQ2FyIiwiQ2FyMiIsIlRydWNrIiwiTG9nIiwiVHVydGxlIiwiZ2FtZVdpZHRoIiwiZ2FtZUhlaWdodCIsInNjb3JlIiwibGV2ZWwiLCJmcm9nZ2VyIiwibGFuZXMiLCJyZWFjaGVkIiwidmVsb2NpdHkiLCJvYnN0YWNsZXNBcnJheSIsImZvckVhY2giLCJvYnN0YWNsZSIsImRyYXdTZWxmIiwiZHJhd0Zyb2ciLCJtb3ZlT2JzdGFjbGVzIiwiY2hlY2tGcm9nTG9jYXRpb24iLCJ5IiwiY2hlY2tGb3JSb2FkQ29sbGlzaW9uIiwiY2hlY2tGb3JSaXZlckNvbGxpc2lvbiIsImxldmVsVXAiLCJrZXljb2RlIiwibW92ZUZyb2dVcCIsImFkZFNjb3JlIiwibW92ZUZyb2dEb3duIiwibW92ZUZyb2dSaWdodCIsIm1vdmVGcm9nTGVmdCIsImZyb2dMZWZ0IiwieCIsImZyb2dSaWdodCIsIm9ic3RhY2xlTGVmdCIsIm9ic3RhY2xlUmlnaHQiLCJsb3NlTGlmZSIsImNvbGxpZGluZ09ic3RhY2xlIiwiZmluZCIsInVuZGVmaW5lZCIsImZyb2dSaWRlc09ic3RhY2xlIiwibGl2ZXMiLCJsYW5lIiwidXBkYXRlTGl2ZXNEaXNwbGF5Iiwic2hvd0dhbWVPdmVyIiwic2hvd0RlYXRoIiwicmVzdGFydExldmVsIiwic2V0VGltZW91dCIsInJlbW92ZURlYXRoIiwiaW5uZXJUZXh0IiwibmV3R2FtZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiZGlyZWN0aW9uIiwic2hvd0xldmVsVXAiLCJ1cGRhdGVMZXZlbERpc3BsYXkiLCJpbmNyZWFzZU9ic3RhY2xlU3BlZWQiLCJvYmplY3QiLCJyZW1vdmVMZXZlbFVwIiwidXBkYXRlU2NvcmVEaXNwbGF5IiwibW9kdWxlIiwiZXhwb3J0cyIsImltZyIsIkltYWdlIiwic3JjIiwiZHJhd0ltYWdlIiwiT2JzdGFjbGUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLE9BQU8sbUJBQUFDLENBQVEsQ0FBUixDQUFiO0FBQ0EsS0FBTUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsS0FBSUMs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QjtBQUkzQjs7O0dBTGlCa0YsUTs7QUFTcEJOLFFBQU9DLE9BQVAsR0FBaUIxRCxLQUFqQixDOzs7Ozs7Ozs7Ozs7OztBQ1hBLEtBQU0rRCxXQUFXLG1CQUFBNUYsQ0FBUSxDQUFSLENBQWpCOztLQUVNOEIsRzs7O0FBQ0osZ0JBQVk0QixDQUFaLEVBQWVYLENBQWYsRUFBa0JSLFFBQWxCLEVBQTRCO0FBQUE7O0FBQUEsMkdBQ3BCbUIsQ0FEb0IsRUFDakJYLENBRGlCLEVBQ2RSLFFBRGM7O0FBRTFCLFdBQUtzRCxJQUFMLEdBQVksS0FBWjtBQUNBLFdBQUtuRixLQUFMLEdBQWEsR0FBYjtBQUgwQjtBQUkzQjs7O0dBTGVrRixROztBQVNsQk4sUUFBT0MsT0FBUCxHQUFpQnpELEdBQWpCLEM7Ozs7Ozs7Ozs7Ozs7O0FDWEEsS0FBTThELFdBQVcsbUJBQUE1RixDQUFRLENBQVIsQ0FBakI7O0tBRU0rQixNOzs7QUFDSixtQkFBWTJCLENBQVosRUFBZVgsQ0FBZixFQUFrQlIsUUFBbEIsRUFBNEI7QUFBQTs7QUFBQSxpSEFDcEJtQixDQURvQixFQUNqQlgsQ0FEaUIsRUFDZFIsUUFEYzs7QUFFMUIsV0FBS3NELElBQUwsR0FBWSxRQUFaO0FBQ0EsV0FBS25GLEtBQUwsR0FBYSxHQUFiO0FBSDBCO0FBSTNCOzs7R0FMa0JrRixROztBQVNyQk4sUUFBT0MsT0FBUCxHQUFpQnhELE1BQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYjNhZTg1NDc5Njc3MzY1ZmE4MiIsImNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUuanMnKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xubGV0IGdhbWVcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XG4gIGdhbWUgPSBuZXcgR2FtZSgpO1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIGdhbWUuZHJhd09iamVjdHMoY3R4KTtcbiAgZ2FtZS5hbmltYXRlT2JzdGFjbGVzKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBnYW1lLmNvbnRyb2xGcm9nKGV2ZW50LmtleUNvZGUpO1xufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gIGluaXRpYWxpemVHYW1lKCk7XG4gIGdhbWVMb29wKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1zY3JlZW4nKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXN0YXRzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufSlcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjb25zdCBGcm9nID0gcmVxdWlyZSgnLi9Gcm9nLmpzJylcbmNvbnN0IENhciA9IHJlcXVpcmUoJy4vQ2FyLmpzJylcbmNvbnN0IENhcjIgPSByZXF1aXJlKCcuL0NhcjIuanMnKVxuY29uc3QgVHJ1Y2sgPSByZXF1aXJlKCcuL1RydWNrLmpzJylcbmNvbnN0IExvZyA9IHJlcXVpcmUoJy4vTG9nLmpzJylcbmNvbnN0IFR1cnRsZSA9IHJlcXVpcmUoJy4vVHVydGxlLmpzJylcblxuICBcbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVXaWR0aCA9IDU1MDtcbiAgICB0aGlzLmdhbWVIZWlnaHQgPSA2NTA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2coKVxuICAgIHRoaXMubGFuZXMgPSBbXG4gICAgICB7aGVpZ2h0OiA1NTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMn0sXG4gICAgICB7aGVpZ2h0OiA1MDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTN9LFxuICAgICAge2hlaWdodDogNDUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDEuMjV9LFxuICAgICAge2hlaWdodDogNDAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC02fSxcbiAgICAgIHtoZWlnaHQ6IDM1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAxLjV9LFxuICAgICAge2hlaWdodDogMzAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDB9LFxuICAgICAge2hlaWdodDogMjUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC0yfSxcbiAgICAgIHtoZWlnaHQ6IDIwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAyLjV9LFxuICAgICAge2hlaWdodDogMTUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IC0xfSxcbiAgICAgIHtoZWlnaHQ6IDEwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiA0LjV9LFxuICAgICAge2hlaWdodDogNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLS41fSxcbiAgICAgIHtoZWlnaHQ6IDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMH1cbiAgICBdXG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheSA9IFtcbiAgICAgIG5ldyBDYXIyKDAsIHRoaXMubGFuZXNbMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzBdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIyKDE1MCwgdGhpcy5sYW5lc1swXS5oZWlnaHQsIHRoaXMubGFuZXNbMF0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcig1MjUsIHRoaXMubGFuZXNbMV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzFdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMzc1LCB0aGlzLmxhbmVzWzFdLmhlaWdodCwgdGhpcy5sYW5lc1sxXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDIyNSwgdGhpcy5sYW5lc1sxXS5oZWlnaHQsIHRoaXMubGFuZXNbMV0udmVsb2NpdHkpLFxuICAgICAgbmV3IFRydWNrKDI1MCwgdGhpcy5sYW5lc1syXS5oZWlnaHQsIHRoaXMubGFuZXNbMl0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigyMjUsIHRoaXMubGFuZXNbM10uaGVpZ2h0LCB0aGlzLmxhbmVzWzNdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMzc1LCB0aGlzLmxhbmVzWzNdLmhlaWdodCwgdGhpcy5sYW5lc1szXS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soNDAwLCB0aGlzLmxhbmVzWzRdLmhlaWdodCwgdGhpcy5sYW5lc1s0XS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soMTI1LCB0aGlzLmxhbmVzWzRdLmhlaWdodCwgdGhpcy5sYW5lc1s0XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDMwMCwgdGhpcy5sYW5lc1s2XS5oZWlnaHQsIHRoaXMubGFuZXNbNl0udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgzMjUsIHRoaXMubGFuZXNbN10uaGVpZ2h0LCB0aGlzLmxhbmVzWzddLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUdXJ0bGUoMTUwLCB0aGlzLmxhbmVzWzddLmhlaWdodCwgdGhpcy5sYW5lc1s3XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDQwMCwgdGhpcy5sYW5lc1s4XS5oZWlnaHQsIHRoaXMubGFuZXNbOF0udmVsb2NpdHkpLFxuICAgICAgbmV3IExvZygxMDAsIHRoaXMubGFuZXNbOF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzhdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUdXJ0bGUoMTAwLCB0aGlzLmxhbmVzWzldLmhlaWdodCwgdGhpcy5sYW5lc1s5XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDQyNSwgdGhpcy5sYW5lc1sxMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzEwXS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDE3NSwgdGhpcy5sYW5lc1sxMF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzEwXS52ZWxvY2l0eSlcbiAgICBdO1xuXG4gIH1cblxuXG4gIGRyYXdPYmplY3RzKGN0eCkge1xuICAgIHRoaXMub2JzdGFjbGVzQXJyYXkuZm9yRWFjaChvYnN0YWNsZSA9PiB7XG4gICAgICBvYnN0YWNsZS5kcmF3U2VsZihjdHgpXG4gICAgfSlcbiAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2coY3R4KTtcbiAgfVxuXG4gIGFuaW1hdGVPYnN0YWNsZXMoKSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9ic3RhY2xlID0+IG9ic3RhY2xlLm1vdmVPYnN0YWNsZXMoKSlcbiAgICB0aGlzLmNoZWNrRnJvZ0xvY2F0aW9uKCk7ICBcbiAgfVxuXG4gIGNoZWNrRnJvZ0xvY2F0aW9uKCkge1xuICAgIGlmICh0aGlzLmZyb2dnZXIueSA+IHRoaXMubGFuZXNbNV0uaGVpZ2h0KSB7XG4gICAgICB0aGlzLmNoZWNrRm9yUm9hZENvbGxpc2lvbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mcm9nZ2VyLnkgPCB0aGlzLmxhbmVzWzVdLmhlaWdodCAmJiB0aGlzLmZyb2dnZXIueSA+PSA1MCkge1xuICAgICAgdGhpcy5jaGVja0ZvclJpdmVyQ29sbGlzaW9uKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyb2dnZXIueSA8IDUwKSB7XG4gICAgICB0aGlzLmxldmVsVXAoKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sRnJvZyhrZXljb2RlKSB7XG4gICAgaWYgKGtleWNvZGUgPT09IDM4KSB7XG4gICAgICB0aGlzLmZyb2dnZXIubW92ZUZyb2dVcCgpXG4gICAgICB0aGlzLmFkZFNjb3JlKCk7XG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSA0MCkge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nRG93bih0aGlzLmdhbWVIZWlnaHQpXG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSAzOSkge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nUmlnaHQodGhpcy5nYW1lV2lkdGgpXG4gICAgfSBlbHNlIGlmIChrZXljb2RlID09PSAzNykge1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmVGcm9nTGVmdCgpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tGb3JSb2FkQ29sbGlzaW9uKCkge1xuICAgIHRoaXMub2JzdGFjbGVzQXJyYXkuZm9yRWFjaChvYnN0YWNsZSA9PiB7XG4gICAgICBjb25zdCBmcm9nTGVmdCA9IHRoaXMuZnJvZ2dlci54O1xuICAgICAgY29uc3QgZnJvZ1JpZ2h0ID0gdGhpcy5mcm9nZ2VyLnggKyB0aGlzLmZyb2dnZXIud2lkdGg7XG4gICAgICBjb25zdCBvYnN0YWNsZUxlZnQgPSBvYnN0YWNsZS54O1xuICAgICAgY29uc3Qgb2JzdGFjbGVSaWdodCA9IG9ic3RhY2xlLnggKyBvYnN0YWNsZS53aWR0aDtcblxuICAgICAgaWYgKChvYnN0YWNsZUxlZnQgPD0gZnJvZ0xlZnQgJiYgZnJvZ0xlZnQgPD0gb2JzdGFjbGVSaWdodCAmJiBvYnN0YWNsZS55ID09PSB0aGlzLmZyb2dnZXIueSkgfHwgXG4gICAgICAgIChmcm9nTGVmdCA8PSBvYnN0YWNsZUxlZnQgJiYgb2JzdGFjbGVMZWZ0IDw9IGZyb2dSaWdodCAmJiBvYnN0YWNsZS55ID09PSB0aGlzLmZyb2dnZXIueSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvc2VMaWZlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY2hlY2tGb3JSaXZlckNvbGxpc2lvbigpIHtcbiAgICBsZXQgY29sbGlkaW5nT2JzdGFjbGUgPSB0aGlzLm9ic3RhY2xlc0FycmF5LmZpbmQob2JzdGFjbGUgPT4ge1xuICAgICAgY29uc3QgZnJvZ0xlZnQgPSB0aGlzLmZyb2dnZXIueDtcbiAgICAgIGNvbnN0IGZyb2dSaWdodCA9IHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoO1xuICAgICAgY29uc3Qgb2JzdGFjbGVMZWZ0ID0gb2JzdGFjbGUueCAtIDEwO1xuICAgICAgY29uc3Qgb2JzdGFjbGVSaWdodCA9IG9ic3RhY2xlLnggKyBvYnN0YWNsZS53aWR0aCArIDEwO1xuXG4gICAgICBpZiAoKG9ic3RhY2xlTGVmdCA8PSBmcm9nTGVmdCkgJiYgKGZyb2dMZWZ0IDw9IG9ic3RhY2xlUmlnaHQpICYmXG4gICAgICAgIChvYnN0YWNsZUxlZnQgPD0gZnJvZ1JpZ2h0KSAmJiAoZnJvZ1JpZ2h0IDw9IG9ic3RhY2xlUmlnaHQpICYmXG4gICAgICAgIChvYnN0YWNsZS55ID09PSB0aGlzLmZyb2dnZXIueSkgXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG9ic3RhY2xlXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChjb2xsaWRpbmdPYnN0YWNsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmZyb2dSaWRlc09ic3RhY2xlKGNvbGxpZGluZ09ic3RhY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb3NlTGlmZSgpXG4gICAgfVxuICAgIFxuICB9XG5cbiAgZnJvZ1JpZGVzT2JzdGFjbGUoY29sbGlkaW5nT2JzdGFjbGUpIHtcbiAgICBjb25zdCBmcm9nTGVmdCA9IHRoaXMuZnJvZ2dlci54O1xuICAgIGNvbnN0IGZyb2dSaWdodCA9IHRoaXMuZnJvZ2dlci54ICsgdGhpcy5mcm9nZ2VyLndpZHRoO1xuXG4gICAgdGhpcy5mcm9nZ2VyLnggKz0gY29sbGlkaW5nT2JzdGFjbGUudmVsb2NpdHlcbiAgICBcbiAgICBpZiAoZnJvZ1JpZ2h0ID4gdGhpcy5nYW1lV2lkdGggfHwgZnJvZ0xlZnQgPD0gMCkge1xuICAgICAgdGhpcy5sb3NlTGlmZSgpICAgIFxuICAgIH1cblxuICB9XG5cbiAgbG9zZUxpZmUoKSB7XG4gICAgdGhpcy5mcm9nZ2VyLmxpdmVzLS07XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4gbGFuZS5yZWFjaGVkID0gZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlTGl2ZXNEaXNwbGF5KCk7XG5cbiAgICBpZiAodGhpcy5mcm9nZ2VyLmxpdmVzID09PSAwKSB7XG4gICAgICB0aGlzLnNob3dHYW1lT3ZlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEZWF0aCgpO1xuICAgICAgdGhpcy5yZXN0YXJ0TGV2ZWwoKTtcbiAgICB9XG4gIH1cblxuICBzaG93RGVhdGgoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlYXRoJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVEZWF0aCwgMTUwMCk7XG4gIH1cblxuICByZW1vdmVEZWF0aCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVhdGgnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH1cblxuICBzaG93R2FtZU92ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtb3ZlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWwtc2NvcmUnKS5pbm5lclRleHQgPSBcbiAgICAgIGBGaW5hbCBTY29yZTogJHt0aGlzLnNjb3JlfWA7XG4gICAgc2V0VGltZW91dCh0aGlzLm5ld0dhbWUsIDI1MDApO1xuICB9XG5cbiAgbmV3R2FtZSgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICB9XG5cbiAgcmVzdGFydExldmVsKCkge1xuICAgIHRoaXMuZnJvZ2dlci54ID0gMjUwO1xuICAgIHRoaXMuZnJvZ2dlci55ID0gNjAwO1xuICAgIHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24gPSAndXAnO1xuICAgIFxuICB9XG5cbiAgbGV2ZWxVcCgpIHtcbiAgICB0aGlzLmxldmVsKys7XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4gbGFuZS5yZWFjaGVkID0gZmFsc2UpO1xuICAgIHRoaXMuc2hvd0xldmVsVXAoKTtcbiAgICB0aGlzLnVwZGF0ZUxldmVsRGlzcGxheSgpO1xuICAgIHRoaXMucmVzdGFydExldmVsKCk7XG4gICAgdGhpcy5pbmNyZWFzZU9ic3RhY2xlU3BlZWQoKTtcbiAgfVxuXG4gIGluY3JlYXNlT2JzdGFjbGVTcGVlZCgpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgIGlmIChvYmplY3QudmVsb2NpdHkgPCAwKSB7XG4gICAgICAgIG9iamVjdC52ZWxvY2l0eSAtPSAuNTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdC52ZWxvY2l0eSArPSAuNTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2hvd0xldmVsVXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxldmVsLXVwJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVMZXZlbFVwLCAxNTAwKTtcbiAgfVxuXG4gIHJlbW92ZUxldmVsVXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxldmVsLXVwJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9XG5cbiAgYWRkU2NvcmUoKSB7XG4gICAgdGhpcy5sYW5lcy5mb3JFYWNoKGxhbmUgPT4ge1xuICAgICAgaWYgKHRoaXMuZnJvZ2dlci55ID09PSBsYW5lLmhlaWdodCAmJiBsYW5lLnJlYWNoZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGxhbmUucmVhY2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVTY29yZURpc3BsYXkoKTtcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlRGlzcGxheSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKS5pbm5lclRleHQgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICB9XG5cbiAgdXBkYXRlTGV2ZWxEaXNwbGF5KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbCcpLmlubmVyVGV4dCA9IGBMZXZlbDogJHt0aGlzLmxldmVsfWA7XG4gIH1cblxuICB1cGRhdGVMaXZlc0Rpc3BsYXkoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdmVzJykuaW5uZXJUZXh0ID0gYExpdmVzOiAke3RoaXMuZnJvZ2dlci5saXZlc31gO1xuICB9XG5cbn1cblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgRnJvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMueCA9IDI1MDtcbiAgICB0aGlzLnkgPSA2MDA7XG4gICAgdGhpcy53aWR0aCA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gICAgdGhpcy52ZWxvY2l0eSA9IDA7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICB9XG5cbiAgZHJhd0Zyb2coY3R4KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gYC4vYXNzZXRzL2Zyb2ctaWNvbi0ke3RoaXMuZGlyZWN0aW9ufS5wbmdgO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCB0aGlzLngsIHRoaXMueSk7XG5cbiAgfVxuXG4gIG1vdmVGcm9nVXAoKSB7XG4gICAgaWYgKCEodGhpcy55ID09PSAwKSkge1xuICAgICAgdGhpcy55IC09IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGcm9nRG93bihnYW1lSGVpZ2h0KSB7XG4gICAgaWYgKCEodGhpcy55ID09PSBnYW1lSGVpZ2h0IC0gdGhpcy5oZWlnaHQpKSB7XG4gICAgICB0aGlzLnkgKz0gNTA7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICB9XG4gIH1cblxuICBtb3ZlRnJvZ1JpZ2h0KGdhbWVXaWR0aCkge1xuICAgIGlmICghKHRoaXMueCA9PT0gZ2FtZVdpZHRoIC0gdGhpcy53aWR0aCkpIHtcbiAgICAgIHRoaXMueCArPSA1MDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICB9XG4gIH1cblxuICBtb3ZlRnJvZ0xlZnQoKSB7XG4gICAgaWYgKCEodGhpcy54ID09PSAwKSkge1xuICAgICAgdGhpcy54IC09IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgfVxuICB9XG4gIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyb2c7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvRnJvZy5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgQ2FyIGV4dGVuZHMgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHN1cGVyKHgsIHksIHZlbG9jaXR5KTtcbiAgICB0aGlzLnR5cGUgPSAnY2FyJztcbiAgICB0aGlzLndpZHRoID0gNTA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9DYXIuanMiLCJjbGFzcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICB9XG5cbiAgZHJhd1NlbGYoY3R4KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcuc3JjID0gYC4vYXNzZXRzLyR7dGhpcy50eXBlfS5wbmdgO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCB0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICBtb3ZlT2JzdGFjbGVzKCkge1xuICAgIGNvbnN0IGdhbWVXaWR0aCA9IDU1MDtcblxuICAgIGlmICh0aGlzLnggPCBnYW1lV2lkdGggLSAxICYmIHRoaXMudmVsb2NpdHkgPiAwKSB7XG4gICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eTtcbiAgICB9IGVsc2UgaWYgKHRoaXMueCA+PSBnYW1lV2lkdGggLSAxICYmIHRoaXMudmVsb2NpdHkgPiAwKSB7XG4gICAgICB0aGlzLnggPSAtdGhpcy53aWR0aDtcbiAgICB9IFxuXG4gICAgaWYgKHRoaXMueCA+IC10aGlzLndpZHRoICsgMSAmJiB0aGlzLnZlbG9jaXR5IDwgMCkge1xuICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnggPD0gLXRoaXMud2lkdGggKyAxICYmIHRoaXMudmVsb2NpdHkgPCAwKSB7XG4gICAgICB0aGlzLnggPSBnYW1lV2lkdGg7XG4gICAgfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9PYnN0YWNsZS5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgQ2FyMiBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ2NhcjInO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyMjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQ2FyMi5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgVHJ1Y2sgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICd0cnVjayc7XG4gICAgdGhpcy53aWR0aCA9IDE1MDtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVHJ1Y2s7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1RydWNrLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBMb2cgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICdsb2cnO1xuICAgIHRoaXMud2lkdGggPSAxNTA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvTG9nLmpzIiwiY29uc3QgT2JzdGFjbGUgPSByZXF1aXJlKCcuLi9saWIvT2JzdGFjbGUuanMnKVxuXG5jbGFzcyBUdXJ0bGUgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICd0dXJ0bGUnO1xuICAgIHRoaXMud2lkdGggPSAxMDA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFR1cnRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvVHVydGxlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==