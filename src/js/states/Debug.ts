
import {GameState, LootInfo} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";

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

        let emitter = this.game.add.emitter(250,250, 100);
        emitter.makeParticles('blue-spark');
        emitter.gravity.setTo(0,0);
        emitter.maxParticleSpeed.x = 700;
        emitter.minParticleSpeed.x = -700;
        emitter.maxParticleSpeed.y = 700;
        emitter.minParticleSpeed.y = -700;
        emitter.setScale(.5, .05, .5, .05, 500, Phaser.Easing.Cubic.Out);
        emitter.start(true, 500, undefined, 10);

        // emitter0.spee(-800, 800);
        // emitter0.setEmitAngle(0, 360);
        // emitter0.setScale(0.5, 0);
        // emitter0.setBlendMode(Phaser.BlendModes.SCREEN);
        // emitter0.enabled = false;
        // emitter0.life = 0.6;
        // emitter0.gravityY = 800;
        // emitter1.setSpeed(-800, 800);
        // emitter1.setEmitAngle(0, 360);
        // emitter1.setScale(0.3, 0);
        // emitter1.setBlendMode(Phaser.BlendModes.SCREEN);
        // emitter1.enabled = false;
        // emitter1.life = 0.3;
        // emitter1.gravityY = 800;


        let lock = this.game.add.sprite(300, 300, 'pico-icons', 39);
        lock.scale.setTo(8)

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
