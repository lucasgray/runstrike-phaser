

import SetupTurret from "./SetupTurret";
import Mission from "../../../../missions/Mission";
import {GameState} from "../../../state/GameData";
import InputHandler from "../../../../handlers/InputHandler";

export class StandardSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'turret-1', inputHandler);
    }
}

export class BlueSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'blue-turret', inputHandler);
    }
}

export class GreenSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'green-turret', inputHandler);
    }
}

export class YellowSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'yellow-turret', inputHandler);
    }
}

export class RedSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'red-turret', inputHandler);
    }
}

export class OrangeSetupTurret extends SetupTurret {

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                inputHandler: InputHandler
    ) {
        super(mission, game, gameState, row, col, 'orange-turret', inputHandler);
    }
}
