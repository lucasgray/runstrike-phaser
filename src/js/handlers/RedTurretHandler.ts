import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {RedSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import SetupTurretInputHandler from "./SetupTurretInputHandler";

export default class RedTurretHandler extends SetupTurretInputHandler {

    icon: string = 'red-turret';
    lootType: string = 'red-turret';
    spriteScaling: number = 1;
    spawnSetupTurret = (grid) => new RedSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

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
