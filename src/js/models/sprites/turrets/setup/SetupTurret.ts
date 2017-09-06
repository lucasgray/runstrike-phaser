

import Turret from "../Turret";
import {GameState} from "../../../state/GameData";
import InputHandler from "../../../../handlers/InputHandler";
import Mission from "../../../../missions/Mission";
import Projectile from "../../projectiles/Projectile";
import BlueBlob from "../../projectiles/BlueBlob";

abstract class SetupTurret extends Turret {

    gameState: GameState;
    inputHandler: InputHandler;

    //todo dont really need these
    range: number = 0;
    fireRate: number = 0;
    shoot: () => Projectile = () => new BlueBlob(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game,
                gameState: GameState,
                row: number, col: number,
                texture: string,
                inputHandler: InputHandler
    ) {
        super(mission, game, row, col, texture);

        this.inputHandler = inputHandler;

        this.gameState = gameState;

        this.events.onInputDown.add(this.remove, this);

        this.inputEnabled = true;
    }

    remove(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        console.log('removing placed sprite');

        //add one back into unplaced loot
        let grid = this.mission.gridDescriptor.getGridLocation(pointer);
        this.gameState.unplaceItem(this.inputHandler.lootType, this.mission.name, grid.x, grid.y);

        //update num
        this.inputHandler.updateText();

        //remove sprite
        sprite.destroy();
    }
}

export default SetupTurret;
