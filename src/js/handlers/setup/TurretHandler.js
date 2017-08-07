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
var Turret_1 = require("../../objects/Turret");
var SpriteExtensions_1 = require("../../extensions/SpriteExtensions");
var TurretHandler = (function (_super) {
    __extends(TurretHandler, _super);
    function TurretHandler(mission, allHandlers, gameState, game, x, y) {
        var _this = _super.call(this, game, x, y) || this;
        _this.mission = mission;
        _this.allHandlers = allHandlers;
        _this.gameState = gameState;
        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);
        var parentSprite = game.add.sprite(x, y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();
        var turretIcon = game.add.sprite(0, 0, 'turret');
        turretIcon.anchor.set(0.5);
        // turretIcon.scale.setTo(.25, .25);
        parentSprite.addChild(turretIcon);
        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 25);
        var itemSprite = game.add.sprite(0, 0, graphics.generateTexture());
        graphics.destroy();
        itemSprite.anchor.set(.5);
        parentSprite.addChild(itemSprite);
        SpriteExtensions_1["default"].alignInParent(itemSprite, parentSprite, Phaser.BOTTOM_RIGHT);
        var text = game.add.text(1, 2, _this.num(), {
            font: '12px Righteous',
            fill: "#F1235B",
            align: "center"
        });
        text.anchor.set(.5);
        itemSprite.addChild(text);
        parentSprite.inputEnabled = true;
        parentSprite.events.onInputDown.add(_this.inputListener, parentSprite);
        _this.text = text;
        return _this;
    }
    TurretHandler.prototype.update = function () {
    };
    TurretHandler.prototype.inputListener = function () {
        this.currentlyActiveHandler = true;
        this.game.input.onTap.removeAll();
        this.game.add.tween(this.allHandlers.filter(function (i) { return i.currentlyActiveHandler; }).pop().scale)
            .to({ x: 1.0, y: 1.0 }, 200, Phaser.Easing.Exponential.In).start();
        this.allHandlers.map(function (i) { return i.currentlyActiveHandler = false; });
        this.game.input.onTap.add(this.action, this);
        this.game.add.tween(this.scale).to({ x: 1.4, y: 1.4 }, 600, Phaser.Easing.Bounce.Out).start();
        var button = this.game.add.audio('button');
        button.play();
    };
    TurretHandler.prototype.action = function (pointer, doubleTap, sprite) {
        this.currentlyActiveHandler = true;
        var grid = this.getGridLocation(pointer);
        //check if currently there is a turret there.
        //if so, were we closer to the top/down/left/right of current,
        //and is there a problem placing there?
        //if not, use one of those
        //make turret
        new Turret_1["default"](this.game, (this.mission.gridSize.offsetX + (grid.x * this.mission.gridSize.cellWidth)), grid.y * this.mission.gridSize.cellHeight);
        this.gameState.placeItem("Turret", this.mission.name, grid.x, grid.y);
        this.text.setText(this.num());
        var place = this.game.add.audio('place-item');
        place.play();
    };
    TurretHandler.prototype.num = function () {
        var turrets = this.gameState.inventoryLoot.filter(function (it) { return it.type === 'Turret'; }).pop();
        if (turrets) {
            return turrets.amount + "";
        }
        else {
            return "0";
        }
    };
    TurretHandler.prototype.getGridLocation = function (input) {
        var gridX = Math.floor((input.x - this.mission.gridSize.offsetX) / this.mission.gridSize.cellWidth);
        if (gridX < 0) {
            gridX = 0;
        }
        if (gridX >= this.mission.gridSize.x) {
            gridX = this.mission.gridSize.x - 1;
        }
        var gridY = Math.floor(input.y / this.mission.gridSize.cellHeight);
        if (gridY < 0) {
            gridY = 0;
        }
        if (gridY >= this.mission.gridSize.y) {
            gridY = this.mission.gridSize.y - 1;
        }
        return { x: gridX, y: gridY };
    };
    return TurretHandler;
}(Phaser.Sprite));
exports["default"] = TurretHandler;
//# sourceMappingURL=TurretHandler.js.map