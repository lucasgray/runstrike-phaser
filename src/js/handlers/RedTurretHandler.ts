import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {RedSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';

export default class RedTurretHandler extends InputHandler {

    icon: string = 'red-turret';
    lootType: string = 'red-turret';
    spriteScaling: number = 1;

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: Array<InputHandler>,
                backgroundSprite: Phaser.Sprite,
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, backgroundSprite, game, x, y);

        super.paint();
    }

    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        if (_.find(this.gameState.inventoryLoot, i => i.type === this.lootType).amount > 0) {
            let grid = this.mission.gridDescriptor.getGridLocation(pointer);

            let turret = new RedSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

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
