import InputHandler from "./InputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";

export default class CocktailHandler extends InputHandler {

    icon: string = 'cocktail_icon';
    lootType: string = 'cocktail';
    spriteScaling: number = .25;

    constructor(mission: Mission,
                gameState: GameState,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, backgroundSprite, game, x, y);

        super.paint();
    }

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
}
