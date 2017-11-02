import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import SpriteExtensions from "../extensions/SpriteExtensions";

export default abstract class InputHandler {

    mission: Mission;
    text: Phaser.Text;

    allHandlers: Array<InputHandler>;

    gameState: GameState;
    game: Phaser.Game;
    parentSprite: Phaser.Sprite;
    inputTargets: Phaser.Sprite[];

    accentColor: string = "#2cfefd";

    /**
     * Icon to display
     */
    abstract icon: string;

    /**
     * Key to look for when updating what is left of the type of loot we have
     */
    abstract lootType: string;

    x: number;
    y: number;

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: Array<InputHandler>,
                inputTargets: Phaser.Sprite[],
                game: Phaser.Game,
                x: number,
                y: number) {

        this.mission = mission;
        this.gameState = gameState;
        this.allHandlers = allHandlers;
        this.game = game;
        this.inputTargets = inputTargets;

        this.x = x;
        this.y = y;
    }

    paint() {
        let parentSprite = this.game.add.sprite(this.x, this.y, this.icon);
        parentSprite.anchor.set(.5);

        let text = this.game.add.text(0, 0, this.num(), {
            font: '10px Joystix',
            fill: this.accentColor,
            align: "right"
        });

        text.anchor.setTo(1,0);
        parentSprite.addChild(text);

        SpriteExtensions.alignInParent(text, parentSprite, Phaser.BOTTOM_RIGHT, 0, 6);

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
        this.allHandlers.forEach(h => h.removeListeners());
        // this.allHandlers.forEach(ih =>
        //     this.game.add.tween(ih.parentSprite.scale).to({x: 1.0, y: 1.0}, 400, Phaser.Easing.Exponential.In).start()
        // );

        //turn this one on
        // this.game.add.tween(this.parentSprite.scale).to({x: 1.4, y: 1.4}, 400, Phaser.Easing.Exponential.In).start();
        let button = this.game.add.audio('button');
        button.play();

        //add an onTap to listen for for the action we want to perform
        this.addMyListener();
    }

    /**
     * The action performed if you choose this handler and click on the background!
     *
     * @param pointer
     * @param sprite
     */
    abstract action(sprite: Phaser.Sprite, pointer: Phaser.Pointer);

    /**
     * How to add my listener
     */
    addMyListener() {
        this.inputTargets.filter(t => t.alive).forEach(t => {
            t.inputEnabled = true;
            t.events.onInputDown.add(this.action, this)
        });
    }

    /**
     * How to remove listener when we're no longer the active input handler
     */
    removeListeners() {
        this.inputTargets.filter(t => t.alive).forEach(t => {
            t.inputEnabled = false;
            t.events.onInputDown.removeAll()
        });
    }

    num() {

        let amt = this.gameState.inventoryLoot.filter(it => it.type === this.lootType).pop();

        if (amt) {
            return amt.amount > 9 ? "" + amt.amount: "0" + amt.amount;
        } else {
            return "0";
        }
    }

    updateText() {
        this.text.setText(this.num());
    }

    shutdown() {
        this.parentSprite.destroy();
    }

}
