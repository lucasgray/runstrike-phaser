import SetupTurretInputHandler from "./SetupTurretInputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {AutoSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import {AutoTurret} from "../models/sprites/turrets/Turrets";

export class StandardTurretHandler extends SetupTurretInputHandler {

    icon: string = 'auto-turret-ui';
    lootType: string = 'auto_turret';
    spriteScaling: number = .8;
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

    icon: string = 'heavy-turret-ui';
    lootType: string = 'standard-turret';
    spriteScaling: number = .8;
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
