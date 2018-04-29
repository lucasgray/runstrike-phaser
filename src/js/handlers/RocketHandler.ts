import InputHandler from "./InputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import * as _ from 'lodash';

export default class RocketHandler extends InputHandler {

    icon: string = 'ui-rocket-inactive';
    activeIcon: string = 'ui-rocket-active';
    lootType: string = 'rocket';
    lootPrettyName: 'rocket';

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: InputHandler[],
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, [backgroundSprite], game, x, y);

        super.paint();
    }

    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        let loot = _.find(this.gameState.inventoryItems, i => i.type === this.lootType);

        if (loot !== undefined && loot.amount > 0) {
            let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
            explosion.anchor.setTo(0.5, 0.5);
            let explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);

            this.mission.enemies.forEachAlive((sprite) => {
                let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

                if (dist <= 50) {
                    sprite.damage(2000);
                }
            });

            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
            });

            this.gameState.useItem(this.lootType);
            this.text.setText(this.num());
        } else {
            let cantplace = this.game.add.audio('wrong-choice');
            cantplace.play();
        }
    }
}
