import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {GreenSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import SetupTurretInputHandler from "./SetupTurretInputHandler";

export default class GreenTurretHandler extends SetupTurretInputHandler {

    icon: string = 'green-turret';
    lootType: string = 'green-turret';
    spriteScaling: number = 1;
    spawnSetupTurret = (grid) => new GreenSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: Array<InputHandler>,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, backgroundSprite, game, x, y);

        super.paint();
    }
}
