import BlueTurret from "../models/sprites/turrets/BlueTurret";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {BlueSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";

export default class BlueTurretHandler extends InputHandler {

    icon: string = 'blue-turret';
    lootType: string = 'Blue-Turret';
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

        let turret = new BlueSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);

        this.game.add.existing(turret);

        this.gameState.placeItem(this.lootType, this.mission.name, grid.x, grid.y);
        this.updateText();

        let place = this.game.add.audio('place-item');
        place.play();
    }

}
