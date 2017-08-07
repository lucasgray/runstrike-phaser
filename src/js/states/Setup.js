"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Button_1 = require("../objects/Button");
var TurretHandler_1 = require("../handlers/setup/TurretHandler");
var Turret_1 = require("../objects/Turret");
var Wall_1 = require("../objects/Wall");
var Setup = (function (_super) {
    __extends(Setup, _super);
    function Setup(gameState) {
        var _this = _super.call(this) || this;
        _this.gameState = gameState;
        return _this;
    }
    Setup.prototype.init = function (mission) {
        this.mission = mission;
    };
    Setup.prototype.preload = function () {
    };
    Setup.prototype.create = function () {
        // this.objects = [];
        var _this = this;
        var background = this.game.add.sprite(this.mission.gridSize.offsetX, 0, 'skirmish-background');
        background.width = this.mission.gridSize.width;
        background.height = this.mission.gridSize.height;
        this.game.world.sendToBack(background);
        console.log(this.gameState.placedLoot);
        this.gameState.placedLoot.filter(function (it) { return it.mission === _this.mission.name; }).forEach(function (it) {
            //TODO factory or something
            if (it.type.toLowerCase() == 'turret') {
                new Turret_1["default"](_this.game, (_this.mission.gridSize.offsetX + (it.x * _this.mission.gridSize.cellWidth)), it.y * _this.mission.gridSize.cellHeight);
            }
            else if (it.type.toLowerCase() == 'wall') {
                new Wall_1["default"](_this.game, (_this.mission.gridSize.offsetX + (it.x * _this.mission.gridSize.cellWidth)), it.y * _this.mission.gridSize.cellHeight);
            }
        });
        this.drawInputs();
    };
    Setup.prototype.drawInputs = function () {
        // Object.keys(setupInputHandlers).forEach((ih,index) => {
        //     new setupInputHandlers[ih](this.game, 50, 300 + (90 * index));
        // });
        var _this = this;
        new TurretHandler_1["default"](this.mission, [], this.gameState, this.game, 50, 300);
        new Button_1["default"](this.game, 100, this.game.height - 40, 100, 40, 'Back', function () {
            console.log("asking to go back");
            _this.state.start('Missions');
        });
        new Button_1["default"](this.game, this.game.width - 80, this.game.height - 40, 100, 40, 'Defend', function () {
            console.log("asking to defend");
            _this.state.start('Play');
        });
    };
    Setup.prototype.drawColor = function (color, x, y, callback) {
        var g = this.game.add.graphics(0, 0);
        g.lineStyle(2, color, 0.5);
        g.beginFill(color, 1);
        g.drawRect(x, y, this.mission.gridSize.cellWidth, this.mission.gridSize.cellHeight); //no anchor, need to move it!
        g.endFill();
        g.inputEnabled = true;
        if (callback) {
            g.events.onInputDown.add(callback, this.game);
        }
        return g;
    };
    Setup.prototype.update = function () {
        if (this.game.input.activePointer.isDown) {
            console.log('moving turret');
            console.log(this.curTurret);
            if (this.curTurret) {
                this.curTurret.x = this.game.input.x;
                this.curTurret.y = this.game.input.y;
            }
            else if (this.curWall) {
                this.curWall.x = this.game.input.x - (this.mission.gridSize.cellWidth / 2);
                this.curWall.y = this.game.input.y - (this.mission.gridSize.cellWidth / 2);
            }
        }
        else {
            if (this.curTurret) {
                console.log("placing turret!");
                this.curTurret.destroy();
                this.curTurret = null;
                var gridLoc = this.getGridLocation(this.game.input);
                // this.gameState.placeItem('Turret',  this.mission.name, gridLoc.x, gridLoc.y);
                // new gameObjects["Turret"](this.game, (this.mission.gridSize.offsetX + (gridLoc.x * this.mission.gridSize.cellWidth)), gridLoc.y * this.mission.gridSize.cellHeight, [this.objects]);
            }
            else if (this.curWall) {
                console.log("placing wall!");
                this.curWall.destroy();
                this.curWall = null;
                var gridLoc = this.getGridLocation(this.game.input);
                // this.gameState.placeItem('Wall',  this.mission.name, gridLoc.x, gridLoc.y);
                // new gameObjects["Wall"](this.game, (this.mission.gridSize.offsetX + (gridLoc.x * this.mission.gridSize.cellWidth)), gridLoc.y * this.mission.gridSize.cellHeight, [this.objects]);
            }
        }
    };
    Setup.prototype.getGridLocation = function (input) {
        var gridX = Math.floor((input.x - this.mission.gridSize.offsetX) / this.mission.gridSize.cellWidth);
        if (gridX < 0) {
            gridX = 0;
        }
        if (gridX >= this.mission.gridSize.x) {
            gridX = this.mission.gridSize.x - 1;
        }
        var gridY = Math.floor(input.y / this.mission.gridSize.cellHeight);
        if (gridY < 0) {
            gridY = 0;
        }
        if (gridY >= this.mission.gridSize.y) {
            gridY = this.mission.gridSize.y - 1;
        }
        return { x: gridX, y: gridY };
    };
    return Setup;
}(Phaser.State));
exports["default"] = Setup;
//# sourceMappingURL=Setup.js.map