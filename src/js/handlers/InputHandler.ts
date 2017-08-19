import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import SpriteExtensions from "../extensions/SpriteExtensions";

export default abstract class InputHandler {

    mission: Mission;
    text: Phaser.Text;

    //TODO later we'll want to keep a reference to all the other handlers on the current state!
    // allHandlers: Array<InputHandler>;

    gameState: GameState;
    game: Phaser.Game;
    parentSprite: Phaser.Sprite;
    backgroundSprite: Phaser.Sprite;

    /**
     * Icon to display inside circle
     */
    abstract icon: string;
    /**
     * Key to look for when updating what is left of the type of loot we have
     */
    abstract lootType: string;
    /**
     * Optional sprite scaling property
     */
    abstract spriteScaling: number;

    x: number;
    y: number;

    constructor(mission: Mission,
                gameState: GameState,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        this.mission = mission;
        this.gameState = gameState;
        this.game = game;
        this.backgroundSprite = backgroundSprite;

        this.x = x;
        this.y = y;
    }

    paint() {
        let graphics = this.game.add.graphics(this.x, this.y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);

        let parentSprite = this.game.add.sprite(this.x, this.y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();

        let icon = this.game.add.sprite(0, 0, this.icon);
        icon.anchor.set(0.5);

        icon.scale.set(this.spriteScaling);

        parentSprite.addChild(icon);

        graphics = this.game.add.graphics(this.x, this.y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 25);

        let itemSprite = this.game.add.sprite(0, 0, graphics.generateTexture());
        graphics.destroy();
        itemSprite.anchor.set(.5);
        parentSprite.addChild(itemSprite);

        SpriteExtensions.alignInParent(itemSprite, parentSprite, Phaser.BOTTOM_RIGHT);

        let text = this.game.add.text(0, 0, this.num(), {
            font: '12px Joystix',
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

    /**
     * The action performed when switching to THIS handler
     * This should go on the parent handler class in the group.
     */
    inputListener() {

        //turn all active handlers off
        this.backgroundSprite.events.onInputDown.removeAll();

        //TODO keep a group of like input handlers and turn them all "off" here!

        this.game.add.tween(this.parentSprite.scale).to({x: 1.4, y: 1.4}, 400, Phaser.Easing.Exponential.In).start();
        let button = this.game.add.audio('button');
        button.play();

        //add an onTap to listen for for the action we want to perform
        this.backgroundSprite.events.onInputDown.add(this.action, this);
    }

    /**
     * The action performed if you choose this handler and click on the background!
     *
     * @param pointer
     * @param sprite
     */
    abstract action(sprite: Phaser.Sprite, pointer: Phaser.Pointer);

    num() {

        let cocktails = this.gameState.inventoryLoot.filter(it => it.type === this.lootType).pop();

        if (cocktails) {
            return cocktails.amount + "";
        } else {
            return "0";
        }
    }

    shutdown() {
        this.parentSprite.destroy();
    }

}
