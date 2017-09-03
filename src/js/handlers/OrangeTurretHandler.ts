import Turret from "../models/sprites/turrets/BlueTurret";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import GreenTurret from "../models/sprites/turrets/GreenTurret";
import OrangeTurret from "../models/sprites/turrets/OrangeTurret";
import {OrangeSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";

export default class OrangeTurretHandler extends InputHandler {

    icon: string = 'orange-turret';
    lootType: string = 'Orange-Turret';
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

        let grid = this.mission.gridDescriptor.getGridLocation(pointer);

        let turret = new OrangeSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

        this.game.add.existing(turret);

        this.gameState.placeItem(this.lootType, this.mission.name, grid.x, grid.y);
        this.updateText();

        let place = this.game.add.audio('place-item');
        place.play();
    }
}
