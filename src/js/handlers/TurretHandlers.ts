import SetupTurretInputHandler from "./SetupTurretInputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {AutoSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import {AutoTurret} from "../models/sprites/turrets/Turrets";

export class StandardTurretHandler extends SetupTurretInputHandler {

    icon: string = 'ui-autotower-inactive';
    activeIcon: string = 'ui-autotower-active';
    lootType: string = 'auto_turret';
    spawnSetupTurret = (grid) => new AutoSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, AutoTurret.HEALTH, this);

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: InputHandler[],
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, backgroundSprite, game, x, y);

        super.paint();
    }
}

export class HeavyTurretHandler extends SetupTurretInputHandler {

    icon: string = 'ui-heavytower-inactive';
    activeIcon: string = 'ui-heavytower-active';
    lootType: string = 'heavy_turret';
    spawnSetupTurret = (grid) => new AutoSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, AutoTurret.HEALTH, this);

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: InputHandler[],
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, backgroundSprite, game, x, y);

        super.paint();
    }
}
