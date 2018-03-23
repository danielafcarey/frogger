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
	        var obstacleLeft = obstacle.x;
	        var obstacleRight = obstacle.x + obstacle.width;
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTU2NTJmMWNiMDZiZjBkMDI3OGMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9Gcm9nLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL09ic3RhY2xlLmpzIiwid2VicGFjazovLy8uL2xpYi9DYXIyLmpzIiwid2VicGFjazovLy8uL2xpYi9UcnVjay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvTG9nLmpzIiwid2VicGFjazovLy8uL2xpYi9UdXJ0bGUuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImdhbWUiLCJpbml0aWFsaXplR2FtZSIsImdhbWVMb29wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3T2JqZWN0cyIsImFuaW1hdGVPYnN0YWNsZXMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRyb2xGcm9nIiwia2V5Q29kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJGcm9nIiwiQ2FyIiwiQ2FyMiIsIlRydWNrIiwiTG9nIiwiVHVydGxlIiwiZ2FtZVdpZHRoIiwiZ2FtZUhlaWdodCIsInNjb3JlIiwibGV2ZWwiLCJmcm9nZ2VyIiwibGFuZXMiLCJyZWFjaGVkIiwidmVsb2NpdHkiLCJvYnN0YWNsZXNBcnJheSIsImZvckVhY2giLCJvYnN0YWNsZSIsImRyYXdTZWxmIiwiZHJhd0Zyb2ciLCJtb3ZlT2JzdGFjbGVzIiwiY2hlY2tGcm9nTG9jYXRpb24iLCJ5IiwiY2hlY2tGb3JSb2FkQ29sbGlzaW9uIiwiY2hlY2tGb3JSaXZlckNvbGxpc2lvbiIsImxldmVsVXAiLCJrZXljb2RlIiwibW92ZUZyb2dVcCIsImFkZFNjb3JlIiwibW92ZUZyb2dEb3duIiwibW92ZUZyb2dSaWdodCIsIm1vdmVGcm9nTGVmdCIsImZyb2dMZWZ0IiwieCIsImZyb2dSaWdodCIsIm9ic3RhY2xlTGVmdCIsIm9ic3RhY2xlUmlnaHQiLCJsb3NlTGlmZSIsImNvbGxpZGluZ09ic3RhY2xlIiwiZmluZCIsInVuZGVmaW5lZCIsImZyb2dSaWRlc09ic3RhY2xlIiwibGl2ZXMiLCJsYW5lIiwidXBkYXRlTGl2ZXNEaXNwbGF5Iiwic2hvd0dhbWVPdmVyIiwic2hvd0RlYXRoIiwicmVzdGFydExldmVsIiwic2V0VGltZW91dCIsInJlbW92ZURlYXRoIiwiaW5uZXJUZXh0IiwibmV3R2FtZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiZGlyZWN0aW9uIiwic2hvd0xldmVsVXAiLCJ1cGRhdGVMZXZlbERpc3BsYXkiLCJpbmNyZWFzZU9ic3RhY2xlU3BlZWQiLCJvYmplY3QiLCJyZW1vdmVMZXZlbFVwIiwidXBkYXRlU2NvcmVEaXNwbGF5IiwibW9kdWxlIiwiZXhwb3J0cyIsImltZyIsIkltYWdlIiwic3JjIiwiZHJhd0ltYWdlIiwiT2JzdGFjbGUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLE9BQU8sbUJBQUFDLENBQVEsQ0FBUixDQUFiO0FBQ0EsS0FBTUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsS0FBSUMs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QVNwQk4sUUFBT0MsT0FBUCxHQUFpQjFELEtBQWpCLEM7Ozs7Ozs7Ozs7Ozs7O0FDWEEsS0FBTStELFdBQVcsbUJBQUE1RixDQUFRLENBQVIsQ0FBakI7O0tBRU04QixHOzs7QUFDSixnQkFBWTRCLENBQVosRUFBZVgsQ0FBZixFQUFrQlIsUUFBbEIsRUFBNEI7QUFBQTs7QUFBQSwyR0FDcEJtQixDQURvQixFQUNqQlgsQ0FEaUIsRUFDZFIsUUFEYzs7QUFFMUIsV0FBS3NELElBQUwsR0FBWSxLQUFaO0FBQ0EsV0FBS25GLEtBQUwsR0FBYSxHQUFiO0FBSDBCO0FBSTNCOzs7R0FMZWtGLFE7O0FBU2xCTixRQUFPQyxPQUFQLEdBQWlCekQsR0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7QUNYQSxLQUFNOEQsV0FBVyxtQkFBQTVGLENBQVEsQ0FBUixDQUFqQjs7S0FFTStCLE07OztBQUNKLG1CQUFZMkIsQ0FBWixFQUFlWCxDQUFmLEVBQWtCUixRQUFsQixFQUE0QjtBQUFBOztBQUFBLGlIQUNwQm1CLENBRG9CLEVBQ2pCWCxDQURpQixFQUNkUixRQURjOztBQUUxQixXQUFLc0QsSUFBTCxHQUFZLFFBQVo7QUFDQSxXQUFLbkYsS0FBTCxHQUFhLEdBQWI7QUFIMEI7QUFJM0I7OztHQUxrQmtGLFE7O0FBU3JCTixRQUFPQyxPQUFQLEdBQWlCeEQsTUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE1NjUyZjFjYjA2YmYwZDAyNzhjIiwiY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZS5qcycpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5sZXQgZ2FtZVxuXG5mdW5jdGlvbiBpbml0aWFsaXplR2FtZSgpIHtcbiAgZ2FtZSA9IG5ldyBHYW1lKCk7XG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgZ2FtZS5kcmF3T2JqZWN0cyhjdHgpO1xuICBnYW1lLmFuaW1hdGVPYnN0YWNsZXMoKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGdhbWUuY29udHJvbEZyb2coZXZlbnQua2V5Q29kZSk7XG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgaW5pdGlhbGl6ZUdhbWUoKTtcbiAgZ2FtZUxvb3AoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LXNjcmVlbicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhdHMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG59KVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNvbnN0IEZyb2cgPSByZXF1aXJlKCcuL0Zyb2cuanMnKVxuY29uc3QgQ2FyID0gcmVxdWlyZSgnLi9DYXIuanMnKVxuY29uc3QgQ2FyMiA9IHJlcXVpcmUoJy4vQ2FyMi5qcycpXG5jb25zdCBUcnVjayA9IHJlcXVpcmUoJy4vVHJ1Y2suanMnKVxuY29uc3QgTG9nID0gcmVxdWlyZSgnLi9Mb2cuanMnKVxuY29uc3QgVHVydGxlID0gcmVxdWlyZSgnLi9UdXJ0bGUuanMnKVxuXG4gIFxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ2FtZVdpZHRoID0gNTUwO1xuICAgIHRoaXMuZ2FtZUhlaWdodCA9IDY1MDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxldmVsID0gMTtcbiAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZygpXG4gICAgdGhpcy5sYW5lcyA9IFtcbiAgICAgIHtoZWlnaHQ6IDU1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAyfSxcbiAgICAgIHtoZWlnaHQ6IDUwMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAtM30sXG4gICAgICB7aGVpZ2h0OiA0NTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMS4yNX0sXG4gICAgICB7aGVpZ2h0OiA0MDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTZ9LFxuICAgICAge2hlaWdodDogMzUwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDEuNX0sXG4gICAgICB7aGVpZ2h0OiAzMDAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogMH0sXG4gICAgICB7aGVpZ2h0OiAyNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTJ9LFxuICAgICAge2hlaWdodDogMjAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDIuNX0sXG4gICAgICB7aGVpZ2h0OiAxNTAsIHJlYWNoZWQ6IGZhbHNlLCB2ZWxvY2l0eTogLTF9LFxuICAgICAge2hlaWdodDogMTAwLCByZWFjaGVkOiBmYWxzZSwgdmVsb2NpdHk6IDQuNX0sXG4gICAgICB7aGVpZ2h0OiA1MCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAtLjV9LFxuICAgICAge2hlaWdodDogMCwgcmVhY2hlZDogZmFsc2UsIHZlbG9jaXR5OiAwfVxuICAgIF1cbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5ID0gW1xuICAgICAgbmV3IENhcjIoMCwgdGhpcy5sYW5lc1swXS5oZWlnaHQsIHRoaXMubGFuZXNbMF0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcjIoMTUwLCB0aGlzLmxhbmVzWzBdLmhlaWdodCwgdGhpcy5sYW5lc1swXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDUyNSwgdGhpcy5sYW5lc1sxXS5oZWlnaHQsIHRoaXMubGFuZXNbMV0udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigzNzUsIHRoaXMubGFuZXNbMV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzFdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBDYXIoMjI1LCB0aGlzLmxhbmVzWzFdLmhlaWdodCwgdGhpcy5sYW5lc1sxXS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHJ1Y2soMjUwLCB0aGlzLmxhbmVzWzJdLmhlaWdodCwgdGhpcy5sYW5lc1syXS52ZWxvY2l0eSksXG4gICAgICBuZXcgQ2FyKDIyNSwgdGhpcy5sYW5lc1szXS5oZWlnaHQsIHRoaXMubGFuZXNbM10udmVsb2NpdHkpLFxuICAgICAgbmV3IENhcigzNzUsIHRoaXMubGFuZXNbM10uaGVpZ2h0LCB0aGlzLmxhbmVzWzNdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUcnVjayg0MDAsIHRoaXMubGFuZXNbNF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzRdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBUcnVjaygxMjUsIHRoaXMubGFuZXNbNF0uaGVpZ2h0LCB0aGlzLmxhbmVzWzRdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coMzAwLCB0aGlzLmxhbmVzWzZdLmhlaWdodCwgdGhpcy5sYW5lc1s2XS52ZWxvY2l0eSksXG4gICAgICBuZXcgVHVydGxlKDMyNSwgdGhpcy5sYW5lc1s3XS5oZWlnaHQsIHRoaXMubGFuZXNbN10udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgxNTAsIHRoaXMubGFuZXNbN10uaGVpZ2h0LCB0aGlzLmxhbmVzWzddLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coNDAwLCB0aGlzLmxhbmVzWzhdLmhlaWdodCwgdGhpcy5sYW5lc1s4XS52ZWxvY2l0eSksXG4gICAgICBuZXcgTG9nKDEwMCwgdGhpcy5sYW5lc1s4XS5oZWlnaHQsIHRoaXMubGFuZXNbOF0udmVsb2NpdHkpLFxuICAgICAgbmV3IFR1cnRsZSgxMDAsIHRoaXMubGFuZXNbOV0uaGVpZ2h0LCB0aGlzLmxhbmVzWzldLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coNDI1LCB0aGlzLmxhbmVzWzEwXS5oZWlnaHQsIHRoaXMubGFuZXNbMTBdLnZlbG9jaXR5KSxcbiAgICAgIG5ldyBMb2coMTc1LCB0aGlzLmxhbmVzWzEwXS5oZWlnaHQsIHRoaXMubGFuZXNbMTBdLnZlbG9jaXR5KVxuICAgIF07XG5cbiAgfVxuXG5cbiAgZHJhd09iamVjdHMoY3R4KSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9ic3RhY2xlID0+IHtcbiAgICAgIG9ic3RhY2xlLmRyYXdTZWxmKGN0eClcbiAgICB9KVxuICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZyhjdHgpO1xuICB9XG5cbiAgYW5pbWF0ZU9ic3RhY2xlcygpIHtcbiAgICB0aGlzLm9ic3RhY2xlc0FycmF5LmZvckVhY2gob2JzdGFjbGUgPT4gb2JzdGFjbGUubW92ZU9ic3RhY2xlcygpKVxuICAgIHRoaXMuY2hlY2tGcm9nTG9jYXRpb24oKTsgIFxuICB9XG5cbiAgY2hlY2tGcm9nTG9jYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuZnJvZ2dlci55ID4gdGhpcy5sYW5lc1s1XS5oZWlnaHQpIHtcbiAgICAgIHRoaXMuY2hlY2tGb3JSb2FkQ29sbGlzaW9uKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyb2dnZXIueSA8IHRoaXMubGFuZXNbNV0uaGVpZ2h0ICYmIHRoaXMuZnJvZ2dlci55ID49IDUwKSB7XG4gICAgICB0aGlzLmNoZWNrRm9yUml2ZXJDb2xsaXNpb24oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZnJvZ2dlci55IDwgNTApIHtcbiAgICAgIHRoaXMubGV2ZWxVcCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRyb2xGcm9nKGtleWNvZGUpIHtcbiAgICBpZiAoa2V5Y29kZSA9PT0gMzgpIHtcbiAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlRnJvZ1VwKClcbiAgICAgIHRoaXMuYWRkU2NvcmUoKTtcbiAgICB9IGVsc2UgaWYgKGtleWNvZGUgPT09IDQwKSB7XG4gICAgICB0aGlzLmZyb2dnZXIubW92ZUZyb2dEb3duKHRoaXMuZ2FtZUhlaWdodClcbiAgICB9IGVsc2UgaWYgKGtleWNvZGUgPT09IDM5KSB7XG4gICAgICB0aGlzLmZyb2dnZXIubW92ZUZyb2dSaWdodCh0aGlzLmdhbWVXaWR0aClcbiAgICB9IGVsc2UgaWYgKGtleWNvZGUgPT09IDM3KSB7XG4gICAgICB0aGlzLmZyb2dnZXIubW92ZUZyb2dMZWZ0KClcbiAgICB9XG4gIH1cblxuICBjaGVja0ZvclJvYWRDb2xsaXNpb24oKSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9ic3RhY2xlID0+IHtcbiAgICAgIGNvbnN0IGZyb2dMZWZ0ID0gdGhpcy5mcm9nZ2VyLng7XG4gICAgICBjb25zdCBmcm9nUmlnaHQgPSB0aGlzLmZyb2dnZXIueCArIHRoaXMuZnJvZ2dlci53aWR0aDtcbiAgICAgIGNvbnN0IG9ic3RhY2xlTGVmdCA9IG9ic3RhY2xlLng7XG4gICAgICBjb25zdCBvYnN0YWNsZVJpZ2h0ID0gb2JzdGFjbGUueCArIG9ic3RhY2xlLndpZHRoO1xuXG4gICAgICBpZiAoKG9ic3RhY2xlTGVmdCA8PSBmcm9nTGVmdCAmJiBmcm9nTGVmdCA8PSBvYnN0YWNsZVJpZ2h0ICYmIG9ic3RhY2xlLnkgPT09IHRoaXMuZnJvZ2dlci55KSB8fCBcbiAgICAgICAgKGZyb2dMZWZ0IDw9IG9ic3RhY2xlTGVmdCAmJiBvYnN0YWNsZUxlZnQgPD0gZnJvZ1JpZ2h0ICYmIG9ic3RhY2xlLnkgPT09IHRoaXMuZnJvZ2dlci55KVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9zZUxpZmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjaGVja0ZvclJpdmVyQ29sbGlzaW9uKCkge1xuICAgIGxldCBjb2xsaWRpbmdPYnN0YWNsZSA9IHRoaXMub2JzdGFjbGVzQXJyYXkuZmluZChvYnN0YWNsZSA9PiB7XG4gICAgICBjb25zdCBmcm9nTGVmdCA9IHRoaXMuZnJvZ2dlci54O1xuICAgICAgY29uc3QgZnJvZ1JpZ2h0ID0gdGhpcy5mcm9nZ2VyLnggKyB0aGlzLmZyb2dnZXIud2lkdGg7XG4gICAgICBjb25zdCBvYnN0YWNsZUxlZnQgPSBvYnN0YWNsZS54O1xuICAgICAgY29uc3Qgb2JzdGFjbGVSaWdodCA9IG9ic3RhY2xlLnggKyBvYnN0YWNsZS53aWR0aDtcblxuICAgICAgaWYgKChvYnN0YWNsZUxlZnQgPD0gZnJvZ0xlZnQpICYmIChmcm9nTGVmdCA8PSBvYnN0YWNsZVJpZ2h0KSAmJlxuICAgICAgICAob2JzdGFjbGVMZWZ0IDw9IGZyb2dSaWdodCkgJiYgKGZyb2dSaWdodCA8PSBvYnN0YWNsZVJpZ2h0KSAmJlxuICAgICAgICAob2JzdGFjbGUueSA9PT0gdGhpcy5mcm9nZ2VyLnkpIFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBvYnN0YWNsZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoY29sbGlkaW5nT2JzdGFjbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5mcm9nUmlkZXNPYnN0YWNsZShjb2xsaWRpbmdPYnN0YWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9zZUxpZmUoKVxuICAgIH1cbiAgICBcbiAgfVxuXG4gIGZyb2dSaWRlc09ic3RhY2xlKGNvbGxpZGluZ09ic3RhY2xlKSB7XG4gICAgY29uc3QgZnJvZ0xlZnQgPSB0aGlzLmZyb2dnZXIueDtcbiAgICBjb25zdCBmcm9nUmlnaHQgPSB0aGlzLmZyb2dnZXIueCArIHRoaXMuZnJvZ2dlci53aWR0aDtcblxuICAgIHRoaXMuZnJvZ2dlci54ICs9IGNvbGxpZGluZ09ic3RhY2xlLnZlbG9jaXR5XG4gICAgXG4gICAgaWYgKGZyb2dSaWdodCA+IHRoaXMuZ2FtZVdpZHRoIHx8IGZyb2dMZWZ0IDw9IDApIHtcbiAgICAgIHRoaXMubG9zZUxpZmUoKSAgICBcbiAgICB9XG5cbiAgfVxuXG4gIGxvc2VMaWZlKCkge1xuICAgIHRoaXMuZnJvZ2dlci5saXZlcy0tO1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IGxhbmUucmVhY2hlZCA9IGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUxpdmVzRGlzcGxheSgpO1xuXG4gICAgaWYgKHRoaXMuZnJvZ2dlci5saXZlcyA9PT0gMCkge1xuICAgICAgdGhpcy5zaG93R2FtZU92ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RGVhdGgoKTtcbiAgICAgIHRoaXMucmVzdGFydExldmVsKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0RlYXRoKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWF0aCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlRGVhdGgsIDE1MDApO1xuICB9XG5cbiAgcmVtb3ZlRGVhdGgoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlYXRoJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9XG5cbiAgc2hvd0dhbWVPdmVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW92ZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbmFsLXNjb3JlJykuaW5uZXJUZXh0ID0gXG4gICAgICBgRmluYWwgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICAgIHNldFRpbWVvdXQodGhpcy5uZXdHYW1lLCAyNTAwKTtcbiAgfVxuXG4gIG5ld0dhbWUoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgfVxuXG4gIHJlc3RhcnRMZXZlbCgpIHtcbiAgICB0aGlzLmZyb2dnZXIueCA9IDI1MDtcbiAgICB0aGlzLmZyb2dnZXIueSA9IDYwMDtcbiAgICB0aGlzLmZyb2dnZXIuZGlyZWN0aW9uID0gJ3VwJztcbiAgfVxuXG4gIGxldmVsVXAoKSB7XG4gICAgdGhpcy5sZXZlbCsrO1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IGxhbmUucmVhY2hlZCA9IGZhbHNlKTtcbiAgICB0aGlzLnNob3dMZXZlbFVwKCk7XG4gICAgdGhpcy51cGRhdGVMZXZlbERpc3BsYXkoKTtcbiAgICB0aGlzLnJlc3RhcnRMZXZlbCgpO1xuICAgIHRoaXMuaW5jcmVhc2VPYnN0YWNsZVNwZWVkKCk7XG4gIH1cblxuICBpbmNyZWFzZU9ic3RhY2xlU3BlZWQoKSB7XG4gICAgdGhpcy5vYnN0YWNsZXNBcnJheS5mb3JFYWNoKG9iamVjdCA9PiB7XG4gICAgICBpZiAob2JqZWN0LnZlbG9jaXR5IDwgMCkge1xuICAgICAgICBvYmplY3QudmVsb2NpdHkgLT0gLjU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3QudmVsb2NpdHkgKz0gLjU7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNob3dMZXZlbFVwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbC11cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlTGV2ZWxVcCwgMTUwMCk7XG4gIH1cblxuICByZW1vdmVMZXZlbFVwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZXZlbC11cCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfVxuXG4gIGFkZFNjb3JlKCkge1xuICAgIHRoaXMubGFuZXMuZm9yRWFjaChsYW5lID0+IHtcbiAgICAgIGlmICh0aGlzLmZyb2dnZXIueSA9PT0gbGFuZS5oZWlnaHQgJiYgbGFuZS5yZWFjaGVkID09PSBmYWxzZSkge1xuICAgICAgICBsYW5lLnJlYWNoZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjb3JlICs9IDEwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlU2NvcmVEaXNwbGF5KCk7XG4gIH1cblxuICB1cGRhdGVTY29yZURpc3BsYXkoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJykuaW5uZXJUZXh0ID0gYFNjb3JlOiAke3RoaXMuc2NvcmV9YDtcbiAgfVxuXG4gIHVwZGF0ZUxldmVsRGlzcGxheSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGV2ZWwnKS5pbm5lclRleHQgPSBgTGV2ZWw6ICR7dGhpcy5sZXZlbH1gO1xuICB9XG5cbiAgdXBkYXRlTGl2ZXNEaXNwbGF5KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcycpLmlubmVyVGV4dCA9IGBMaXZlczogJHt0aGlzLmZyb2dnZXIubGl2ZXN9YDtcbiAgfVxuXG59XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNsYXNzIEZyb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnggPSAyNTA7XG4gICAgdGhpcy55ID0gNjAwO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIHRoaXMudmVsb2NpdHkgPSAwO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgfVxuXG4gIGRyYXdGcm9nKGN0eCkge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaW1nLnNyYyA9IGAuL2Fzc2V0cy9mcm9nLWljb24tJHt0aGlzLmRpcmVjdGlvbn0ucG5nYDtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy54LCB0aGlzLnkpO1xuXG4gIH1cblxuICBtb3ZlRnJvZ1VwKCkge1xuICAgIGlmICghKHRoaXMueSA9PT0gMCkpIHtcbiAgICAgIHRoaXMueSAtPSA1MDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICB9XG4gIH1cblxuICBtb3ZlRnJvZ0Rvd24oZ2FtZUhlaWdodCkge1xuICAgIGlmICghKHRoaXMueSA9PT0gZ2FtZUhlaWdodCAtIHRoaXMuaGVpZ2h0KSkge1xuICAgICAgdGhpcy55ICs9IDUwO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZyb2dSaWdodChnYW1lV2lkdGgpIHtcbiAgICBpZiAoISh0aGlzLnggPT09IGdhbWVXaWR0aCAtIHRoaXMud2lkdGgpKSB7XG4gICAgICB0aGlzLnggKz0gNTA7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZyb2dMZWZ0KCkge1xuICAgIGlmICghKHRoaXMueCA9PT0gMCkpIHtcbiAgICAgIHRoaXMueCAtPSA1MDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgIH1cbiAgfVxuICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcm9nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0Zyb2cuanMiLCJjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoJy4uL2xpYi9PYnN0YWNsZS5qcycpXG5cbmNsYXNzIENhciBleHRlbmRzIE9ic3RhY2xlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHkpIHtcbiAgICBzdXBlcih4LCB5LCB2ZWxvY2l0eSk7XG4gICAgdGhpcy50eXBlID0gJ2Nhcic7XG4gICAgdGhpcy53aWR0aCA9IDUwO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQ2FyLmpzIiwiY2xhc3MgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgfVxuXG4gIGRyYXdTZWxmKGN0eCkge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaW1nLnNyYyA9IGAuL2Fzc2V0cy8ke3RoaXMudHlwZX0ucG5nYDtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgbW92ZU9ic3RhY2xlcygpIHtcbiAgICBjb25zdCBnYW1lV2lkdGggPSA1NTA7XG5cbiAgICBpZiAodGhpcy54IDwgZ2FtZVdpZHRoIC0gMSAmJiB0aGlzLnZlbG9jaXR5ID4gMCkge1xuICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnggPj0gZ2FtZVdpZHRoIC0gMSAmJiB0aGlzLnZlbG9jaXR5ID4gMCkge1xuICAgICAgdGhpcy54ID0gLXRoaXMud2lkdGg7XG4gICAgfSBcblxuICAgIGlmICh0aGlzLnggPiAtdGhpcy53aWR0aCArIDEgJiYgdGhpcy52ZWxvY2l0eSA8IDApIHtcbiAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5O1xuICAgIH0gZWxzZSBpZiAodGhpcy54IDw9IC10aGlzLndpZHRoICsgMSAmJiB0aGlzLnZlbG9jaXR5IDwgMCkge1xuICAgICAgdGhpcy54ID0gZ2FtZVdpZHRoO1xuICAgIH1cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvT2JzdGFjbGUuanMiLCJjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoJy4uL2xpYi9PYnN0YWNsZS5qcycpXG5cbmNsYXNzIENhcjIgZXh0ZW5kcyBPYnN0YWNsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5KSB7XG4gICAgc3VwZXIoeCwgeSwgdmVsb2NpdHkpO1xuICAgIHRoaXMudHlwZSA9ICdjYXIyJztcbiAgICB0aGlzLndpZHRoID0gNTA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENhcjI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0NhcjIuanMiLCJjb25zdCBPYnN0YWNsZSA9IHJlcXVpcmUoJy4uL2xpYi9PYnN0YWNsZS5qcycpXG5cbmNsYXNzIFRydWNrIGV4dGVuZHMgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHN1cGVyKHgsIHksIHZlbG9jaXR5KTtcbiAgICB0aGlzLnR5cGUgPSAndHJ1Y2snO1xuICAgIHRoaXMud2lkdGggPSAxNTA7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFRydWNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9UcnVjay5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgTG9nIGV4dGVuZHMgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHN1cGVyKHgsIHksIHZlbG9jaXR5KTtcbiAgICB0aGlzLnR5cGUgPSAnbG9nJztcbiAgICB0aGlzLndpZHRoID0gMTUwO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2c7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0xvZy5qcyIsImNvbnN0IE9ic3RhY2xlID0gcmVxdWlyZSgnLi4vbGliL09ic3RhY2xlLmpzJylcblxuY2xhc3MgVHVydGxlIGV4dGVuZHMgT2JzdGFjbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSkge1xuICAgIHN1cGVyKHgsIHksIHZlbG9jaXR5KTtcbiAgICB0aGlzLnR5cGUgPSAndHVydGxlJztcbiAgICB0aGlzLndpZHRoID0gMTAwO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBUdXJ0bGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1R1cnRsZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=