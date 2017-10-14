

import SetupTurret from "./SetupTurret";
import Mission from "../../../../missions/Mission";
import {GameState} from "../../../state/GameData";
import InputHandler from "../../../../handlers/InputHandler";

export class TurretOne extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'turret-1', inputHandler, 9, -15);
    }
}
