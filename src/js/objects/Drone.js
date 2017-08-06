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
var EnemyObject_1 = require("./EnemyObject");
var Drone = (function (_super) {
    __extends(Drone, _super);
    function Drone(game, x, y, groups) {
        var _this = _super.call(this) || this;
        var defaultSize = { width: 128, height: 128 };
        var scaleX = game.mission.gridSize.cellWidth / defaultSize.width;
        var scaleY = game.mission.gridSize.cellHeight / defaultSize.height;
        var sprite = game.add.sprite(x + game.mission.gridSize.offsetX, y, 'drone');
        sprite.animations.add('fly');
        sprite.animations.play('fly', 30, true);
        sprite.scale.setTo(scaleX, scaleY);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.inputEnabled = true;
        //TODO: Fix events
        sprite.game = game;
        sprite.events.onInputDown.add(function (sprite, pointer) {
            sprite.game.input.onTap.dispatch(pointer, false, sprite);
        }, sprite);
        sprite.randomVelocity = 50 + (Math.random() * 30);
        sprite.shot = _this.shot;
        sprite.lastCalculation = 0;
        if (groups) {
            _this.addToGroup(groups);
        }
        var curXCell = Math.floor(((sprite.x - sprite.game.mission.gridSize.offsetX) / sprite.game.mission.gridSize.width) * sprite.game.mission.gridSize.x) - 1;
        var curYCell = Math.floor((sprite.y / sprite.game.mission.gridSize.height) * sprite.game.mission.gridSize.y);
        sprite.game.easystar.findPath(curXCell, curYCell, Math.floor(sprite.game.mission.gridSize.x / 2), (sprite.game.mission.gridSize.y - 1), function (path) {
            if (!path) {
                console.log("The path to the destination point was not found.");
            }
            else {
                console.log("easystar success. ");
                path.forEach(function (p) { return console.log(JSON.stringify(p)); });
                sprite.path = path;
            }
            sprite.lastCalculation = Date.now();
        });
        sprite.update = _this.update;
        sprite.explodeSound = function () {
            var sound = null;
            if (Math.random() > .5) {
                sound = game.add.audio('crash-1');
            }
            else {
                sound = game.add.audio('crash-2');
            }
            return sound;
        };
        return sprite;
    }
    Drone.prototype.update = function () {
        if (!this.lastMove && this.alive && this.path) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step
            var path = this.path;
            var first = path[0];
            var second = path[1];
            //second.y * sprite.game.mission.gridSize.cellHeight to convert to cells
            if (this.y >= (second.y * this.game.mission.gridSize.cellHeight)) {
                // console.log("we made it! altering path");
                path = path.slice(1);
                this.path = path;
                first = path[0];
                second = path[1];
            }
            //we want to move towards the CENTER of the next cell.. plus a little randomness
            var xToGo = (second.x * this.game.mission.gridSize.cellWidth + Math.floor(this.game.mission.gridSize.cellWidth / 2));
            var yToGo = (second.y * this.game.mission.gridSize.cellHeight + Math.floor(this.game.mission.gridSize.cellHeight / 2));
            console.log(this.x + ' | ' + this.y);
            console.log(xToGo + ' | ' + yToGo);
            var velocity = this.randomVelocity;
            if (yToGo >= this.game.mission.gridSize.height - this.game.mission.gridSize.cellHeight) {
                this.lastMove = true;
            }
            // console.log("moving to " + xToGo + "," + yToGo)
            this.game.physics.arcade.moveToXY(this, this.game.mission.gridSize.offsetX + xToGo, yToGo, velocity);
            this.game.physics.arcade.rotateToXY(this, this.game.mission.gridSize.offsetX + xToGo, yToGo, 90); //rotate with a 90 deg offset
        }
        else {
            // console.log('lastmoved.')
            if (this.alive) {
                if (this.body.y > this.game.mission.gridSize.height - (this.game.mission.gridSize.cellHeight / 2)) {
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
}(EnemyObject_1["default"]));
exports["default"] = Drone;
//# sourceMappingURL=Drone.js.map