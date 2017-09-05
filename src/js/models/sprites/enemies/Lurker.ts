import Mission from "../../../missions/Mission";
import {PathfindingEnemy} from "./Enemy";

export default class Lurker extends PathfindingEnemy {

    defaultWidth: number = 16;
    defaultHeight: number = 16;
    animationFrameRate: number = 5;
    rotatingSprite: boolean = false;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, row, col, 'lurker', 20);

        this.paint(mission, row, col);
        this.addHealthbar(500);
        this.pathfind(mission, row, col);
    }

    kill() {
        super.kill();

        let explosion = this.game.add.sprite(this.x, this.y, 'explosion');
        explosion.anchor.setTo(.5);
        let explosionAnimation = explosion.animations.add('e');
        explosion.animations.play('e', 30, false);
        explosionAnimation.onComplete.add(() => {
            explosion.destroy();
        });

        this.destroy();

        return this;
    }

}
