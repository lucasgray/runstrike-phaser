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
var Button_1 = require("../prefabs/Button");
var inputHandlers = require("../handlers");
var Phaser = require("phaser-ce");
var Play = (function (_super) {
    __extends(Play, _super);
    function Play() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Play.prototype.preload = function () {
        var _this = this;
        this.graphics = this.game.add.graphics(0, 0);
        //Loop through the mission's sprite and preload them if they aren't already there
        this.game.mission.enemies.forEach(function (it) {
            if (it.image) {
                if (!_this.game.cache.checkImageKey(it.image)) {
                    _this.game.load.image(it.image, it.imageSrc, it.imageSize.x, it.imageSize.y);
                }
            }
        });
    };
    Play.prototype.create = function () {
        this.game.mission.create();
        this.drawHealth();
        this.drawInput();
    };
    Play.prototype.drawHealth = function () {
        //Draw rectangles for health of enemy army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(0, 0, 80, 1080);
        var w = this.game.world.width;
        var h = this.game.world.height;
        //Draw rectangles for health of player army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(w-80, 0, 80, 1080);
    };
    Play.prototype.drawInput = function () {
        var _this = this;
        Object.keys(inputHandlers).forEach(function (ih, index) {
            new inputHandlers[ih](_this.game, 50, 300 + (90 * index));
        });
        this.btnDownSound = this.add.sound('menuDown');
        Button_1["default"].makeButton(this.game, 100, this.game.height - 40, 100, 40, 'Back', function () {
            console.log("asking to go to menu");
            _this.state.start('Missions');
        });
    };
    Play.prototype.update = function () {
        this.game.mission.update();
        this.game.easystar.calculate();
    };
    Play.prototype.shutdown = function () {
        console.log("shut down called");
        this.game.mission.shutdown();
    };
    return Play;
}(Phaser.State));
exports["default"] = Play;
//# sourceMappingURL=Play.js.map