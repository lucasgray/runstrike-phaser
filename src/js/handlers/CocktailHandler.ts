
import Mission from "../missions/Mission";
import TurretHandler from "./TurretHandler";
import {GameState} from "../models/state/GameData";
import SpriteExtensions from "../extensions/SpriteExtensions";

export default class CocktailHandler {

    mission: Mission;
    text: Phaser.Text;

    //TODO later we'll want to keep a reference to all the other handlers..
    // allHandlers: Array<TurretHandler>;

    gameState: GameState;
    game: Phaser.Game;
    parentSprite: Phaser.Sprite;
    backgroundSprite: Phaser.Sprite;

    constructor(mission: Mission, gameState: GameState, backgroundSprite: Phaser.Sprite, game: Phaser.Game, x: number, y: number) {

        this.mission = mission;
        this.gameState = gameState;
        this.game = game;
        this.backgroundSprite = backgroundSprite;

        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);

        var parentSprite = game.add.sprite(x, y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();

        var cocktailIcon = game.add.sprite(0, 0, 'cocktail_icon');
        cocktailIcon.anchor.set(0.5);
        cocktailIcon.scale.set(.25);

        parentSprite.addChild(cocktailIcon);

        graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 25);

        var itemSprite = game.add.sprite(0, 0, graphics.generateTexture());
        graphics.destroy();
        itemSprite.anchor.set(.5);
        parentSprite.addChild(itemSprite);

        SpriteExtensions.alignInParent(itemSprite, parentSprite, Phaser.BOTTOM_RIGHT);

        var text = game.add.text(0, 0, this.num(), {
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
        console.log("hi time to check the background sprite");

        //turn all active handlers off
        this.backgroundSprite.events.onInputDown.removeAll();

        this.game.add.tween(this.parentSprite.scale).to({ x: 1.4, y: 1.4}, 400, Phaser.Easing.Exponential.In).start();
        let button = this.game.add.audio('button');
        button.play();

        //add an onTap to listen for placing turrets
        this.backgroundSprite.events.onInputDown.add(this.action, this);
    }

    /**
     * The action performed if you choose this handler and click on the grid!
     *
     * @param pointer
     * @param sprite
     */
    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);
        let explosionAnimation = explosion.animations.add('fly');
        explosion.animations.play('fly', 30, false);

        this.mission.enemies.forEachAlive((sprite) => {
            let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

            //FIXME
            //for now we just kills em
            if (dist <= 50) {
                sprite.shot();
            }
        });

        explosionAnimation.onComplete.add(() => {
            explosion.destroy();
        });

        this.gameState.useItem("Cocktail");
        this.text.setText(this.num());
    }

    num() {

        let cocktails = this.gameState.inventoryLoot.filter(it => it.type === 'cocktail').pop();

        if (cocktails) {
            return cocktails.amount + "";
        } else {
            return "0";
        }
    }

}
