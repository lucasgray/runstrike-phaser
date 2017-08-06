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
//http://www.quickanddirtytips.com/education/grammar/dialog-or-dialogue
var StoryObject_1 = require("./StoryObject");
var Dialogue = (function (_super) {
    __extends(Dialogue, _super);
    function Dialogue(options) {
        var _this = _super.call(this) || this;
        //buid caption box
        //image
        var image = options.game.add.sprite(options.enemy.x, options.enemy.y, options.enemy.image);
        image.options = options;
        image.showUntil = Date.now() + options.enemy.showFor;
        //text
        image.update = _this.update;
        return image;
    }
    Dialogue.prototype.update = function () {
        if (this.alive) {
            if (Date.now() >= this.showUntil) {
                this.destroy();
            }
        }
    };
    return Dialogue;
}(StoryObject_1["default"]));
exports["default"] = Dialogue;
//# sourceMappingURL=Dialogue.js.map