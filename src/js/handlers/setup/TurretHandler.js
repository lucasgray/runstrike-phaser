"use strict";
exports.__esModule = true;
var Turret_1 = require("../../objects/Turret");
var SpriteExtensions_1 = require("../../extensions/SpriteExtensions");
var TurretHandler = (function () {
    function TurretHandler(mission, allHandlers, gameState, backgroundSprite, game, x, y) {
        this.mission = mission;
        this.allHandlers = allHandlers;
        this.gameState = gameState;
        this.game = game;
        this.backgroundSprite = backgroundSprite;
        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);
        var parentSprite = new Phaser.Sprite(game, x, y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();
        var turretIcon = game.add.sprite(0, 0, 'turret');
        turretIcon.anchor.set(.5);
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
        var text = game.add.text(1, 2, this.num(), {
            font: '12px Righteous',
            fill: "#F1235B",
            align: "center"
        });
        text.anchor.set(.5);
        itemSprite.addChild(text);
        parentSprite.inputEnabled = true;
        parentSprite.events.onInputDown.add(this.inputListener, this);
        this.parentSprite = parentSprite;
        this.game.add.existing(parentSprite);
        this.text = text;
    }
    TurretHandler.prototype.update = function () {
    };
    /**
     * The action performed when switching to THIS handler
     * This should go on the parent handler class in the group.
     */
    TurretHandler.prototype.inputListener = function () {
        //turn all active handlers off
        this.backgroundSprite.events.onInputDown.removeAll();
        this.game.add.tween(this.parentSprite.scale).to({ x: 1.4, y: 1.4 }, 400, Phaser.Easing.Exponential.In).start();
        var button = this.game.add.audio('button');
        button.play();
        //add an onTap to listen for placing turrets
        this.backgroundSprite.events.onInputDown.add(this.action, this);
    };
    /**
     * The action performed if you choose this handler and click on the grid!
     *
     * @param pointer
     * @param sprite
     */
    TurretHandler.prototype.action = function (sprite, pointer) {
        var grid = this.mission.gridDescriptor.getGridLocation(pointer);
        //check if currently there is a turret there.
        //if so, were we closer to the top/down/left/right of current,
        //and is there a problem placing there?
        //if not, use one of those
        //make turret
        var turret = new Turret_1["default"](this.mission, this.game, (this.mission.gridDescriptor.offsetX + (grid.x * this.mission.gridDescriptor.cellWidth)), grid.y * this.mission.gridDescriptor.cellHeight);
        this.game.add.existing(turret);
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
    return TurretHandler;
}());
exports["default"] = TurretHandler;
//# sourceMappingURL=TurretHandler.js.map