
import Turret from "../../objects/Turret";
import Mission from "../../missions/Mission";
import SpriteExtensions from "../../extensions/SpriteExtensions";
import {GameState} from "../../objects/GameData";

export default class TurretHandler extends Phaser.Sprite {

    mission: Mission;
    text: Phaser.Text;
    currentlyActiveHandler: boolean;
    allHandlers: Array<TurretHandler>;
    gameState: GameState;

    constructor(mission: Mission, allHandlers: Array<TurretHandler>, gameState: GameState, game: Phaser.Game, x: number, y: number) {
        super(game, x, y);

        this.mission = mission;
        this.allHandlers = allHandlers;
        this.gameState = gameState;

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

        SpriteExtensions.alignInParent(itemSprite, parentSprite, Phaser.BOTTOM_RIGHT);

        var text = game.add.text(1, 2, this.num(), {
            font: '12px Righteous',
            fill: "#F1235B",
            align: "center"
        });
        text.anchor.set(.5);
        itemSprite.addChild(text);

        parentSprite.inputEnabled = true;
        parentSprite.events.onInputDown.add(this.inputListener, parentSprite);

        this.text = text;
    }

    update() {
    }

    inputListener() {
        this.currentlyActiveHandler = true;
        this.game.input.onTap.removeAll();

        this.game.add.tween(this.allHandlers.filter(i => i.currentlyActiveHandler).pop().scale)
            .to({ x: 1.0, y: 1.0}, 200, Phaser.Easing.Exponential.In).start();
        this.allHandlers.map(i => i.currentlyActiveHandler = false);

        this.game.input.onTap.add(this.action, this);
        this.game.add.tween(this.scale).to({ x: 1.4, y: 1.4}, 600, Phaser.Easing.Bounce.Out).start();

        let button = this.game.add.audio('button');
        button.play();
    }

    action(pointer, doubleTap, sprite) {

        this.currentlyActiveHandler = true;

        let grid = this.getGridLocation(pointer);

        //check if currently there is a turret there.
        //if so, were we closer to the top/down/left/right of current,
        //and is there a problem placing there?
        //if not, use one of those

        //make turret
        new Turret(this.game, (this.mission.gridSize.offsetX + (grid.x * this.mission.gridSize.cellWidth)), grid.y * this.mission.gridSize.cellHeight);
        this.gameState.placeItem("Turret", this.mission.name, grid.x, grid.y);
        this.text.setText(this.num());

        let place = this.game.add.audio('place-item');
        place.play();
    }

    num() {
        let turrets = this.gameState.inventoryLoot.filter(it => it.type === 'Turret').pop();

        if (turrets) {
            return turrets.amount + "";
        } else {
            return "0";
        }
    }

    getGridLocation(input){
        let gridX = Math.floor((input.x - this.mission.gridSize.offsetX)/ this.mission.gridSize.cellWidth);
        if(gridX < 0){
            gridX = 0;
        }
        if(gridX >= this.mission.gridSize.x){
            gridX = this.mission.gridSize.x-1;
        }
        let gridY = Math.floor(input.y / this.mission.gridSize.cellHeight);
        if(gridY < 0){
            gridY = 0;
        }
        if(gridY >= this.mission.gridSize.y){
            gridY = this.mission.gridSize.y -1;
        }
        return {x: gridX, y: gridY};
    }

}
