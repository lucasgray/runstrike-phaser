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

        let emitter = this.game.add.emitter(this.x, this.y, 100);
        emitter.makeParticles('blue-spark');
        emitter.gravity.setTo(0,0);
        emitter.maxParticleSpeed.x = 700;
        emitter.minParticleSpeed.x = -700;
        emitter.maxParticleSpeed.y = 700;
        emitter.minParticleSpeed.y = -700;
        emitter.setScale(.5, .05, .5, .05, 500, Phaser.Easing.Cubic.Out);
        emitter.start(true, 500, undefined, 10);

        let emitter2 = this.game.add.emitter(this.x, this.y, 100);
        emitter2.makeParticles('red-spark');
        emitter2.gravity.setTo(0,0);
        emitter2.maxParticleSpeed.x = 700;
        emitter2.minParticleSpeed.x = -700;
        emitter2.maxParticleSpeed.y = 700;
        emitter2.minParticleSpeed.y = -700;
        emitter2.setScale(.5, .05, .5, .05, 500, Phaser.Easing.Cubic.Out);
        emitter2.start(true, 500, undefined, 10);

        this.destroy();

        return this;
    }

}
