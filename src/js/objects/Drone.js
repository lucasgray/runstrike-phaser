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
var PhysicsExtensions_1 = require("../extensions/PhysicsExtensions");
var Drone = (function (_super) {
    __extends(Drone, _super);
    function Drone(game, x, y, groups) {
        var _this = _super.call(this, game, x, y, 'drone') || this;
        _this.lastMove = false;
        var defaultSize = { width: 128, height: 128 };
        var scaleX = game.mission.gridDescriptor.cellWidth / defaultSize.width;
        var scaleY = game.mission.gridDescriptor.cellHeight / defaultSize.height;
        _this.animations.add('fly');
        _this.animations.play('fly', 30, true);
        _this.scale.setTo(scaleX, scaleY);
        _this.anchor.setTo(0.5, 0.5);
        _this.randomVelocity = 50 + (Math.random() * 30);
        _this.lastCalculation = 0;
        if (groups) {
            game.addToGroup(groups);
        }
        var curXCell = Math.floor(((_this.x - _this.mission.gridDescriptor.offsetX) / _this.mission.gridDescriptor.width) * _this.mission.gridDescriptor.x) - 1;
        var curYCell = Math.floor((_this.y / _this.mission.gridDescriptor.height) * _this.mission.gridDescriptor.y);
        _this.easystar.findPath(curXCell, curYCell, Math.floor(_this.mission.gridDescriptor.x / 2), (_this.mission.gridDescriptor.y - 1), function (path) {
            if (!path) {
                console.log("The path to the destination point was not found.");
            }
            else {
                console.log("easystar success. ");
                path.forEach(function (p) { return console.log(JSON.stringify(p)); });
                _this.path = path;
            }
            _this.lastCalculation = Date.now();
        });
        _this.explodeSound = function () {
            var sound = null;
            if (Math.random() > .5) {
                sound = game.add.audio('crash-1');
            }
            else {
                sound = game.add.audio('crash-2');
            }
            return sound;
        };
        return _this;
    }
    Drone.prototype.update = function () {
        if (!this.lastMove && this.alive && this.path) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step
            var path = this.path;
            var first = path[0];
            var second = path[1];
            //second.y * this.game.mission.gridDescriptor.cellHeight to convert to cells
            if (this.y >= (second.y * this.mission.gridDescriptor.cellHeight)) {
                // console.log("we made it! altering path");
                path = path.slice(1);
                this.path = path;
                first = path[0];
                second = path[1];
            }
            //we want to move towards the CENTER of the next cell.. plus a little randomness
            var xToGo = (second.x * this.mission.gridDescriptor.cellWidth + Math.floor(this.mission.gridDescriptor.cellWidth / 2));
            var yToGo = (second.y * this.mission.gridDescriptor.cellHeight + Math.floor(this.mission.gridDescriptor.cellHeight / 2));
            console.log(this.x + ' | ' + this.y);
            console.log(xToGo + ' | ' + yToGo);
            var velocity = this.randomVelocity;
            if (yToGo >= this.mission.gridDescriptor.height - this.mission.gridDescriptor.cellHeight) {
                this.lastMove = true;
            }
            // console.log("moving to " + xToGo + "," + yToGo)
            this.game.physics.arcade.moveToXY(this, this.mission.gridDescriptor.offsetX + xToGo, yToGo, velocity);
            PhysicsExtensions_1["default"].rotateToXY(this, this.mission.gridDescriptor.offsetX + xToGo, yToGo, 90); //rotate with a 90 deg offset
        }
        else {
            // console.log('lastmoved.')
            if (this.alive) {
                if (this.body.y > this.mission.gridDescriptor.height - (this.mission.gridDescriptor.cellHeight / 2)) {
                    this.game.state.start('Defeat');
                }
            }
        }
    };
    Drone.prototype.shot = function () {
        var _this = this;
        this.alive = false;
        this.explodeSound().play();
        this.game.add.tween(this).to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        var fall = this.game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        fall.onComplete.add(function () {
            var explosion = _this.game.add.sprite(_this.x, _this.y, 'explosion');
            explosion.anchor.setTo(0.2, 0.2);
            explosion.scale.setTo(0.2, 0.2);
            var explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);
            explosionAnimation.onComplete.add(function () {
                explosion.destroy();
                _this.destroy();
            });
        });
    };
    return Drone;
}(Phaser.Sprite));
exports["default"] = Drone;
//# sourceMappingURL=Drone.js.map