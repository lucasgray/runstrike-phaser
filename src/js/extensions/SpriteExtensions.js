"use strict";
exports.__esModule = true;
var SpriteExtensions = (function () {
    function SpriteExtensions() {
    }
    SpriteExtensions.alignInParent = function (sprite, parent, position, offsetX, offsetY) {
        var s = parent.scale;
        parent.scale.setTo(1);
        sprite.alignIn(parent, position, offsetX, offsetY);
        sprite.left -= parent.left + (parent.width * parent.anchor.x);
        sprite.top -= parent.top + (parent.height * parent.anchor.y);
        parent.scale = s;
    };
    ;
    return SpriteExtensions;
}());
exports["default"] = SpriteExtensions;
//# sourceMappingURL=SpriteExtensions.js.map