"use strict";
exports.__esModule = true;
require("phaser");
var Boot_1 = require("./states/Boot");
var game = new Phaser.Game(640, 960, Phaser.AUTO);
//TODO lots of things to revamp if we want to support high dpi :(
//const game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);
game.state.add('Boot', new Boot_1["default"]());
game.state.start('Boot');
//# sourceMappingURL=Game.js.map