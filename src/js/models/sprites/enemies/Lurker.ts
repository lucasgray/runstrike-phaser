import Mission from "../../../missions/Mission";
import {PathfindingEnemy} from "./Enemy";

export default class Lurker extends PathfindingEnemy {

    defaultWidth: number = 16;
    defaultHeight: number = 16;
    animationFrameRate: number = 5;
    rotatingSprite: boolean = false;
    range = 200;
    fireRate = 150;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, 'lurker', 20);

        this.paint(mission, row, col);
        this.addHealthbar(500);
        this.pathfind(mission, row, col);
    }

    kill() {
        super.kill();

        this.deathSequences.basicDeathSequence();

        this.destroy();

        return this;
    }

}
