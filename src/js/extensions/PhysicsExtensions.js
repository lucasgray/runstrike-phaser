"use strict";
exports.__esModule = true;
var Phaser = require("phaser-ce");
var PhysicsExtensions = (function () {
    function PhysicsExtensions() {
    }
    PhysicsExtensions.rotateToXY = function (sprite, x, y, offset) {
        var targetAngle = (360 / (2 * Math.PI)) * Phaser.Math.angleBetween(sprite.x, sprite.y, x, y);
        if (targetAngle < 0)
            targetAngle += 360;
        sprite.angle = targetAngle + offset;
        return targetAngle + offset;
    };
    ;
    return PhysicsExtensions;
}());
exports["default"] = PhysicsExtensions;
//# sourceMappingURL=PhysicsExtensions.js.map