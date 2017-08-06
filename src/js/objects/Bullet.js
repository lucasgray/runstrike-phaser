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
var MapObject_1 = require("./MapObject");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(game, fromSprite, toSprite) {
        var _this = _super.call(this) || this;
        var bullet = game.add.sprite(fromSprite.x, fromSprite.y, 'bullet');
        bullet.anchor.setTo(0.5);
        bullet.angle = fromSprite.angle;
        game.physics.arcade.enable(bullet);
        game.bullets.add(bullet);
        var halfXVelocity = toSprite.body.velocity.x / 2;
        var halfYVelocity = toSprite.body.velocity.y / 2;
        game.physics.arcade.moveToXY(bullet, toSprite.x + halfXVelocity, toSprite.y + halfYVelocity, 300);
        var shootSound = game.add.audio('shoot');
        shootSound.play();
        bullet.game = game;
        bullet.fromSprite = fromSprite;
        bullet.toSprite = toSprite;
        bullet.update = _this.update;
        return bullet;
    }
    Bullet.prototype.update = function () {
        if (Phaser.Math.distance(this.x, this.y, this.fromSprite.x, this.fromSprite.y) > 50) {
            this.kill();
            this.destroy();
        }
    };
    return Bullet;
}(MapObject_1["default"]));
exports["default"] = Bullet;
//# sourceMappingURL=Bullet.js.map