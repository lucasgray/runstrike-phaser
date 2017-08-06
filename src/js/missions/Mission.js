"use strict";
exports.__esModule = true;
var gameObjects = require("../objects");
var EasyStar = require("easystarjs");
var Mission = (function () {
    function Mission(game) {
        this.game = game;
    }
    Mission.prototype.update = function () {
    };
    Mission.prototype.shutdown = function () {
        this.game.stage.backgroundColor = this.previousBackground;
    };
    Mission.prototype.create = function () {
        this.createGrid();
        this.game.inputHandler = function () { return ''; };
    };
    Mission.prototype.calculateGridSize = function () {
        this.gridSize.cellWidth = Math.floor((this.game.width * .8) / this.gridSize.x);
        this.gridSize.cellHeight = Math.floor((this.game.height * .8) / this.gridSize.y);
        this.gridSize.width = this.gridSize.x * this.gridSize.cellWidth;
        this.gridSize.height = this.gridSize.y * this.gridSize.cellHeight;
        this.gridSize.offsetX = (this.game.width - this.gridSize.width) / 2;
    };
    Mission.prototype.createGrid = function () {
        this.game.enemies = this.game.add.physicsGroup();
        this.game.bullets = this.game.add.physicsGroup();
        var background = this.game.add.sprite(this.gridSize.offsetX, 0, 'skirmish-background');
        background.width = this.gridSize.width;
        background.height = this.gridSize.height;
        this.game.world.sendToBack(background);
        this.setupGrid();
    };
    Mission.prototype.setupGrid = function () {
        var _this = this;
        var easystar = new EasyStar.js();
        var grid = [];
        Array.from(new Array(this.gridSize.y)).forEach(function () {
            grid.push(new Array(_this.gridSize.x).fill(0));
        });
        this.game.gameData.placedItems.forEach(function (it) {
            grid[it.y][it.x] = 1;
            new gameObjects[it.type](_this.game, _this.gridSize.offsetX + (it.x * _this.gridSize.cellWidth), it.y * _this.gridSize.cellHeight);
        });
        easystar.setGrid(grid);
        easystar.setAcceptableTiles([0]);
        easystar.calculate();
        easystar.enableDiagonals();
        easystar.disableCornerCutting();
        this.game.easystar = easystar;
        this.game.easystar.calculate();
    };
    return Mission;
}());
exports["default"] = Mission;
//# sourceMappingURL=Mission.js.map