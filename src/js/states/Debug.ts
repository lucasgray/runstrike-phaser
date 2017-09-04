
import {GameState, LootInfo} from "../models/state/GameData";
import Button from "../models/sprites/Button";

export default class Debug extends Phaser.State {

    gameState: GameState;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    create() {

        let graphics = this.game.add.graphics(0, 0);

        var textOne = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 200,
            "placed items: " + this.gameState.placedLoot,
            {
                font: '14px monospace',
                fill: 'white',
                align: 'center'
            });
        textOne.anchor.setTo(0.5);

        var textTwo = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 300,
            "is react native: " + this.gameState.isReactNative,
            {
                font: '14px monospace',
                fill: 'white',
                align: 'center'
            });
        textTwo.anchor.setTo(0.5);

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + 125,
            this.game.width * 0.8,
            60,
            'cheat', ()=>{
                console.log("cheating!");

                this.gameState.inventoryLoot =
                    this.gameState.inventoryLoot.map(i =>
                        new LootInfo(i.type, i.amount += 50)
                    );
            }
        );

        let sprite = this.game.add.sprite(200, 200, 'lurker');

        sprite.animations.add('fly');
        sprite.animations.play('fly', 5, true);
        sprite.scale.setTo(4)

        new Button(
            this.game,
            100,
            this.game.height - 120,
            100,
            30,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }
}
