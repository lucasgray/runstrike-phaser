

import Turret from "../Turret";
import {GameState} from "../../../state/GameData";
import InputHandler from "../../../../handlers/InputHandler";
import Mission from "../../../../missions/Mission";
import Projectile from "../../projectiles/Projectile";
import { AutoShot } from "../../projectiles/Projectiles";

abstract class SetupTurret extends Turret {

    gameState: GameState;
    inputHandler: InputHandler;

    //todo dont really need these
    range: number = 0;
    fireRate: number = 0;
    shoot: () => Projectile = () => new AutoShot(this.game, 0, 0, this, this.mission.gridDescriptor, this.mission.projectileExplosions);

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                texture: string,
                inputHandler: InputHandler,
                offsetX, offsetY
    ) {
        super(mission, game, row, col, texture, offsetX, offsetY);

        this.inputHandler = inputHandler;

        this.gameState = gameState;

        this.inputEnabled = true;
        this.events.onInputDown.add(this.remove, this);
    }

    update() { }

    doRotation () { }

    remove(turret: Turret) {

        console.log('removing placed sprite');

        //add one back into unplaced loot
        let grid = this.mission.gridDescriptor.getGridLocation({x: turret.x, y: turret.y});
        this.gameState.unplaceItem(this.inputHandler.lootType, this.mission.name, grid.x, grid.y);

        //update num
        this.inputHandler.updateText();

        //remove sprite
        turret.base.destroy();
        turret.destroy();
    }
}

export default SetupTurret;
