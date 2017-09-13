import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {BlueSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import SetupTurret from "../models/sprites/turrets/setup/SetupTurret";
import SetupTurretInputHandler from "./SetupTurretInputHandler";

export default class BlueTurretHandler extends SetupTurretInputHandler {

    icon: string = 'blue-turret';
    lootType: string = 'blue-turret';
    spriteScaling: number = 1;
    spawnSetupTurret = (grid) =>  new BlueSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

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
