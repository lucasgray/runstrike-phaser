

import SetupTurret from "./SetupTurret";
import Mission from "../../../../missions/Mission";
import {GameState} from "../../../state/GameData";
import InputHandler from "../../../../handlers/InputHandler";
import {AutoTurret} from "../Turrets";

export class AutoSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number, curHealth: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'auto_turret', inputHandler, 9, -15);

        this.addHealthbar(curHealth, AutoTurret.HEALTH);
    }
}
