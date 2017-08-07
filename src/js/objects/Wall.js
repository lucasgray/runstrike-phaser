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
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(game, x, y) {
        var _this = _super.call(this, game, x, y) || this;
        var g = game.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x0000FF, 1);
        g.drawRect(x, y, game.mission.gridSize.cellWidth, game.mission.gridSize.cellHeight); //no anchor, need to move it!
        g.endFill();
        g.inputEnabled = true;
        return _this;
        // this.addToGroup(groups);
    }
    return Wall;
}(Phaser.Sprite));
exports["default"] = Wall;
//# sourceMappingURL=Wall.js.map