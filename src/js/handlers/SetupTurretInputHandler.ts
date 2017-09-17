
import InputHandler from "./InputHandler";
import SetupTurret from "../models/sprites/turrets/setup/SetupTurret";
import * as _ from 'lodash';
import Turret from "../models/sprites/turrets/Turret";
import {GameState} from "../models/state/GameData";
import Mission from "../missions/Mission";

export default abstract class SetupTurretInputHandler extends InputHandler {

    abstract spawnSetupTurret: (grid: {x: number, y: number}) => SetupTurret;

    placementGroup : Phaser.Group;

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: Array<InputHandler>,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number,
                placementGroup : Phaser.Group) {
        super(mission, gameState, allHandlers, backgroundSprite, game, x, y);

        this.placementGroup = placementGroup;
    }

     /**
     * The action performed if you choose this handler and click on the background!
     *
     * @param pointer
     * @param sprite
     */
    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        let loot = _.find(this.gameState.inventoryLoot, i => i.type === this.lootType);

        let grid = this.mission.gridDescriptor.getGridLocation(pointer);

        if (loot !== undefined && loot.amount > 0 &&
            this.mission.gridDescriptor.placeableTerrain[grid.y][grid.x] === 0) {

            let turret = this.spawnSetupTurret(grid);

            this.game.add.existing(turret);
            this.placementGroup.add(turret.base);
            this.placementGroup.add(turret);

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
