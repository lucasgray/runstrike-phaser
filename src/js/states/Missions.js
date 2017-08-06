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
var missions = require("../missions");
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(gameState) {
        var _this = _super.call(this) || this;
        _this.gameState = gameState;
        return _this;
    }
    Menu.prototype.create = function () {
        var _this = this;
        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Select Mission", {
            font: '60px Righteous',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);
        Object.keys(missions).forEach(function (mission, index) {
            new Button_1["default"](_this.game, _this.game.world.centerX, _this.game.world.centerY + (70 * index), _this.game.width * 0.8, 60, mission, function () {
                console.log("asking to play a mission!");
                _this.state.start('Setup', new missions[mission](_this.game));
            });
        });
        new Button_1["default"](this.game, 100, this.game.height - 40, 100, 40, 'Back', function () {
            console.log("asking to go to menu");
            _this.state.start('Menu');
        });
    };
    return Menu;
}(Phaser.State));
exports["default"] = Menu;
//# sourceMappingURL=Missions.js.map