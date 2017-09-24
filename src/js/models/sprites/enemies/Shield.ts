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

        this.mission.playDeathEmitter(this.x, this.y);

        this.destroy();

        return this;
    }

}
