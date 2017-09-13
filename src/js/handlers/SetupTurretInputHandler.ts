
import InputHandler from "./InputHandler";
import SetupTurret from "../models/sprites/turrets/setup/SetupTurret";
import * as _ from 'lodash';

export default abstract class SetupTurretInputHandler extends InputHandler {

    abstract spawnSetupTurret: (grid: {x: number, y: number}) => SetupTurret;

    /**
     * The action performed if you choose this handler and click on the background!
     *
     * @param pointer
     * @param sprite
     */
    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        let loot = _.find(this.gameState.inventoryLoot, i => i.type === this.lootType);

        if (loot !== undefined && loot.amount > 0) {

            //TODO add a condition to see if this is a placeable grid location or not
            let grid = this.mission.gridDescriptor.getGridLocation(pointer);

            let turret = this.spawnSetupTurret(grid);

            this.game.add.existing(turret);

            this.gameState.placeItem(this.lootType, this.mission.name, grid.x, grid.y);
            this.updateText();

            let place = this.game.add.audio('place-item');
            place.play();
        } else {
            let cantplace = this.game.add.audio('wrong-choice');
            cantplace.play();
        }
    }

}
