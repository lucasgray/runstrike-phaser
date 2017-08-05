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
var Phaser = require("phaser-ce");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(game, x, y, width, height, label, callback) {
        var _this = _super.call(this, game, x, y) || this;
        _this.width = width;
        _this.height = height;
        _this.label = label;
        _this.callback = callback;
        _this.paint();
        return _this;
    }
    Button.prototype.paint = function () {
        //create graphics to make rectangle
        var _this = this;
        var graphics = this.game.add.graphics(this.x, this.y);
        graphics.lineStyle(2, 0xF1235B, 1);
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
        var sprite = this.game.add.sprite(this.x, this.y, graphics.generateTexture());
        graphics.destroy();
        _super.prototype.addChild.call(this, sprite);
        //text to go on button
        var text = this.game.add.text(0, 0, this.label, {
            font: 'Righteous',
            fill: 'white',
            align: 'center',
            fontSize: this.height * 0.7
        });
        text.anchor.setTo(0.5);
        sprite.addChild(text);
        sprite.anchor.setTo(0.5);
        //what to do on button click
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(function () {
            var button = _this.game.add.audio('button');
            button.play();
            var tweenDown = _this.game.add.tween(sprite.scale).to({ x: 0.8, y: 0.8 }, 200, Phaser.Easing.Exponential.Out);
            var tweenUp = _this.game.add.tween(sprite.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Exponential.Out);
            tweenDown.chain(tweenUp);
            tweenUp.onComplete.add(_this.callback);
            tweenDown.start();
        }, sprite);
        this.game.add.existing(sprite);
    };
    return Button;
}(Phaser.Sprite));
exports["default"] = Button;
//# sourceMappingURL=Button.js.map