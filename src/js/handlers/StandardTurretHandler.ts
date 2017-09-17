import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {BlueSetupTurret, StandardSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import SetupTurret from "../models/sprites/turrets/setup/SetupTurret";
import SetupTurretInputHandler from "./SetupTurretInputHandler";

export default class StandardTurretHandler extends SetupTurretInputHandler {

    icon: string = 'turret-1';
    lootType: string = 'standard-turret';
    spriteScaling: number = .8;
    spawnSetupTurret = (grid) => new StandardSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: Array<InputHandler>,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number,
                placementGroup: Phaser.Group) {

        super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);

        super.paint();
    }
}
