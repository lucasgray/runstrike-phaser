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
var GridDescriptor_1 = require("../extensions/GridDescriptor");
var Mission = (function (_super) {
    __extends(Mission, _super);
    function Mission() {
        var _this = _super.call(this) || this;
        _this.gridSize = new GridDescriptor_1["default"]();
        return _this;
    }
    Mission.prototype.update = function () {
    };
    Mission.prototype.shutdown = function () {
    };
    Mission.prototype.create = function () {
        this.createGrid();
    };
    Mission.prototype.calculateGridSize = function () {
        this.gridSize.cellWidth = Math.floor((this.game.width * .8) / this.gridSize.x);
        this.gridSize.cellHeight = Math.floor((this.game.height * .8) / this.gridSize.y);
        this.gridSize.width = this.gridSize.x * this.gridSize.cellWidth;
        this.gridSize.height = this.gridSize.y * this.gridSize.cellHeight;
        this.gridSize.offsetX = (this.game.width - this.gridSize.width) / 2;
    };
    Mission.prototype.createGrid = function () {
        // this.game.enemies = this.game.add.physicsGroup();
        // this.game.bullets = this.game.add.physicsGroup();
        var background = this.game.add.sprite(this.gridSize.offsetX, 0, 'skirmish-background');
        background.width = this.gridSize.width;
        background.height = this.gridSize.height;
        this.game.world.sendToBack(background);
        // this.setupGrid();
    };
    return Mission;
}(Phaser.State));
exports["default"] = Mission;
//# sourceMappingURL=Mission.js.map