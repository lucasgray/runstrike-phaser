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
var TurretHandler_1 = require("../handlers/setup/TurretHandler");
var Turret_1 = require("../objects/Turret");
var Setup = (function (_super) {
    __extends(Setup, _super);
    function Setup(gameState) {
        var _this = _super.call(this) || this;
        _this.gameState = gameState;
        console.log("setup");
        return _this;
    }
    Setup.prototype.init = function (mission) {
        this.mission = mission;
        console.log("mission" + mission);
    };
    Setup.prototype.preload = function () {
    };
    Setup.prototype.create = function () {
        // this.objects = [];
        var _this = this;
        var background = this.game.add.sprite(this.mission.gridDescriptor.offsetX, 0, 'skirmish-background'); //this.mission.background);
        background.width = this.mission.gridDescriptor.width;
        background.height = this.mission.gridDescriptor.height;
        this.game.world.sendToBack(background);
        background.inputEnabled = true;
        this.backgroundSprite = background;
        console.log(this.gameState.placedLoot);
        this.gameState.placedLoot.filter(function (it) { return it.mission === _this.mission.name; }).forEach(function (it) {
            //TODO factory or something
            if (it.type.toLowerCase() == 'turret') {
                var turret = new Turret_1["default"](_this.mission, _this.game, (_this.mission.gridDescriptor.offsetX + (it.x * _this.mission.gridDescriptor.cellWidth)), it.y * _this.mission.gridDescriptor.cellHeight);
                _this.game.add.existing(turret);
            }
        });
        this.drawInputs();
    };
    Setup.prototype.drawInputs = function () {
        var _this = this;
        // Object.keys(setupInputHandlers).forEach((ih,index) => {
        //     new setupInputHandlers[ih](this.game, 50, 300 + (90 * index));
        // });
        var turretHandler = new TurretHandler_1["default"](this.mission, [], this.gameState, this.backgroundSprite, this.game, 50, 300);
        new Button_1["default"](this.game, 100, this.game.height - 40, 100, 40, 'Back', function () {
            console.log("asking to go back");
            _this.state.start('Missions');
        });
        new Button_1["default"](this.game, this.game.width - 80, this.game.height - 40, 100, 40, 'Defend', function () {
            console.log("asking to defend");
            _this.state.start('Play');
        });
    };
    return Setup;
}(Phaser.State));
exports["default"] = Setup;
//# sourceMappingURL=Setup.js.map