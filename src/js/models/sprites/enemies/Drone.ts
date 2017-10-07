import Mission from "../../../missions/Mission";
import {FlyingEnemy} from "./Enemy";

export default class Drone extends FlyingEnemy {

    defaultWidth: number = 32;
    defaultHeight: number = 32;
    animationFrameRate: number = 15;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, 'drone', 50);

        this.paint(mission, row, col);
        this.addHealthbar(250);
        this.flyTowardsBase();
    }

    kill() {
        super.kill();

        this.game.add.tween(this).to({angle: 359}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        let fallTween = this.game.add.tween(this.scale).to({x: 0, y: 0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);

        fallTween.onComplete.add(() => {
            this.alive = false;

            let explosion = new Phaser.Sprite(this.game, this.x, this.y, 'explosion');
            this.mission.doodads.add(explosion);
            explosion.anchor.setTo(0.5);
            explosion.scale.setTo(0.2, 0.2);
            let explosionAnimation = explosion.animations.add('a');
            explosion.animations.play('a', 30, false);
            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
                this.destroy();
            });
        });

        return this;
    }

}
