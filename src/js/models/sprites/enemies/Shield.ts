import Mission from "../../../missions/Mission";
import {PathfindingEnemy} from "./Enemy";

export default class Shield extends PathfindingEnemy {

    defaultWidth: number = 16;
    defaultHeight: number = 16;
    animationFrameRate: number = 5;
    rotatingSprite: boolean = false;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, 'shield', 10);

        this.paint(mission, row, col);
        this.addHealthbar(1000);
        this.pathfind(mission, row, col);
    }

    kill() {
        super.kill();

        let explosion = this.game.add.sprite(this.x, this.y, 'explosion');
        explosion.anchor.setTo(.5);
        let explosionAnimation = explosion.animations.add('fly');
        explosion.animations.play('fly', 30, false);
        explosionAnimation.onComplete.add(() => {
            explosion.destroy();
        });

        this.destroy();

        return this;
    }

}
