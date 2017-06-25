import InputHandler from './../InputHandler';
import Turret from "../../objects/Turret";

export default class TurretHandler extends InputHandler {
    constructor(game, x, y) {
        super(game);

        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);

        var parentSprite = game.add.sprite(x, y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();

        var turretIcon = game.add.sprite(0, 0, 'green-turret');
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
        itemSprite.alignInParent(Phaser.BOTTOM_RIGHT);

        var text = game.add.text(1, 2, this.num(), {
            font: '12px Righteous',
            fill: "#F1235B",
            align: "center"
        });
        text.anchor.set(.5);
        itemSprite.addChild(text);

        parentSprite.inputEnabled = true;
        parentSprite.events.onInputDown.add(this.inputListener, parentSprite);

        parentSprite.inputListener = this.inputListener;
        parentSprite.action = this.action;
        parentSprite.text = text;
        parentSprite.num = this.num;
        parentSprite.getGridLocation = this.getGridLocation;

        return parentSprite;
    }

    update() {
    }

    inputListener() {
        this.firstEvent = true;
        this.game.input.onTap.removeAll();
        if (this.game.activeInputHandler) {
            this.game.add.tween(this.game.activeInputHandler.scale)
                .to({ x: 1.0, y: 1.0}, 200, Phaser.Easing.Exponential.In).start();
        }
        this.game.input.onTap.add(this.action, this);
        this.game.add.tween(this.scale).to({ x: 1.4, y: 1.4}, 600, Phaser.Easing.Bounce.Out).start();
        this.game.activeInputHandler = this;

        let button = this.game.add.audio('button');
        button.play();
    }

    action(pointer, doubleTap, sprite) {
        if (this.firstEvent) {
            this.firstEvent = false;
            this.game.activeInputHandler = this;
            return;
        }

        let grid = this.getGridLocation(pointer);

        //check if currently there is a turret there.
        //if so, were we closer to the top/down/left/right of current,
        //and is there a problem placing there?
        //if not, use one of those

        //make turret
        new Turret(this.game, (this.game.mission.gridSize.offsetX + (grid.x * this.game.mission.gridSize.cellWidth)), grid.y * this.game.mission.gridSize.cellHeight, null);
        this.game.dao.placeItem("Turret", this.game.mission.name, grid.x, grid.y);
        this.text.setText(this.num());

        let place = this.game.add.audio('place-item');
        place.play();
    }

    num() {
        let turrets = this.game.gameData.inventoryItems.find(it => it.type === 'Turret');

        if (turrets) {
            return turrets.amount + "";
        } else {
            return "0";
        }
    }

    getGridLocation(input){
        let gridX = Math.floor((input.x - this.game.mission.gridSize.offsetX)/ this.game.mission.gridSize.cellWidth);
        if(gridX < 0){
            gridX = 0;
        }
        if(gridX >= this.game.mission.gridSize.x){
            gridX = this.game.mission.gridSize.x-1;
        }
        let gridY = Math.floor(input.y / this.game.mission.gridSize.cellHeight);
        if(gridY < 0){
            gridY = 0;
        }
        if(gridY >= this.game.mission.gridSize.y){
            gridY = this.game.mission.gridSize.y -1;
        }
        return {x: gridX, y: gridY};
    }

}
