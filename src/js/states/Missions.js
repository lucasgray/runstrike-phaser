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
var Button_1 = require("../objects/Button");
var Missions = (function (_super) {
    __extends(Missions, _super);
    function Missions(gameState) {
        var _this = _super.call(this) || this;
        _this.gameState = gameState;
        return _this;
    }
    Missions.prototype.create = function () {
        var _this = this;
        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Select Mission", {
            font: '60px Righteous',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);
        new Button_1["default"](this.game, this.game.world.centerX, this.game.world.centerY + (70), this.game.width * 0.8, 60, 'Skirmish', function () {
            console.log("asking to play a mission!");
            _this.game.state.start('Skirmish');
        });
        new Button_1["default"](this.game, 100, this.game.height - 40, 100, 40, 'Back', function () {
            console.log("asking to go to menu");
            _this.state.start('Menu');
        });
    };
    return Missions;
}(Phaser.State));
exports["default"] = Missions;
//# sourceMappingURL=Missions.js.map