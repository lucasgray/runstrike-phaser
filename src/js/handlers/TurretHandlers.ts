import SetupTurretInputHandler from "./SetupTurretInputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "./InputHandler";
import {StandardSetupTurret} from "../models/sprites/turrets/setup/SetupTurrets";

export default class StandardTurretHandler extends SetupTurretInputHandler {

    icon: string = 'turret-1';
    lootType: string = 'standard-turret';
    spriteScaling: number = .8;
    spawnSetupTurret = (grid) => new StandardSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
    lootPrettyName: string = 'AC 001';

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
}

// export default class BlueTurretHandler extends SetupTurretInputHandler {
//
//     icon: string = 'blue-turret';
//     lootType: string = 'blue-turret';
//     spriteScaling: number = 1;
//     spawnSetupTurret = (grid) => new BlueSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
//
//     constructor(mission: Mission,
//                 gameState: GameState,
//                 allHandlers: Array<InputHandler>,
//                 backgroundSprite: Phaser.Sprite,
//                 game: Phaser.Game,
//                 x: number,
//                 y: number,
//                 placementGroup: Phaser.Group) {
//
//         super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);
//
//         super.paint();
//     }
// }
//
// export default class GreenTurretHandler extends SetupTurretInputHandler {
//
//     icon: string = 'green-turret';
//     lootType: string = 'green-turret';
//     spriteScaling: number = 1;
//     spawnSetupTurret = (grid) => new GreenSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
//
//     constructor(mission: Mission,
//                 gameState: GameState,
//                 allHandlers: Array<InputHandler>,
//                 backgroundSprite: Phaser.Sprite,
//                 game: Phaser.Game,
//                 x: number,
//                 y: number,
//                 placementGroup: Phaser.Group) {
//
//         super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);
//
//         super.paint();
//     }
// }
//
// export default class YellowTurretHandler extends SetupTurretInputHandler {
//
//     icon: string = 'yellow-turret';
//     lootType: string = 'yellow-turret';
//     spriteScaling: number = 1;
//     spawnSetupTurret = (grid) => new YellowSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
//
//     constructor(mission: Mission,
//                 gameState: GameState,
//                 allHandlers: Array<InputHandler>,
//                 backgroundSprite: Phaser.Sprite,
//                 game: Phaser.Game,
//                 x: number,
//                 y: number,
//                 placementGroup: Phaser.Group) {
//
//         super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);
//
//         super.paint();
//     }
// }
//
// export default class RedTurretHandler extends SetupTurretInputHandler {
//
//     icon: string = 'red-turret';
//     lootType: string = 'red-turret';
//     spriteScaling: number = 1;
//     spawnSetupTurret = (grid) => new RedSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
//
//     constructor(mission: Mission,
//                 gameState: GameState,
//                 allHandlers: Array<InputHandler>,
//                 backgroundSprite: Phaser.Sprite,
//                 game: Phaser.Game,
//                 x: number,
//                 y: number,
//                 placementGroup: Phaser.Group) {
//
//         super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);
//
//         super.paint();
//     }
// }
//
// export default class OrangeTurretHandler extends SetupTurretInputHandler {
//
//     icon: string = 'orange-turret';
//     lootType: string = 'orange-turret';
//     spriteScaling: number = 1;
//     spawnSetupTurret = (grid) => new OrangeSetupTurret(this.mission, this.game, this.gameState, grid.x, grid.y, this);
//
//     constructor(mission: Mission,
//                 gameState: GameState,
//                 allHandlers: Array<InputHandler>,
//                 backgroundSprite: Phaser.Sprite,
//                 game: Phaser.Game,
//                 x: number,
//                 y: number,
//                 placementGroup: Phaser.Group) {
//
//         super(mission, gameState, allHandlers, backgroundSprite, game, x, y, placementGroup);
//
//         super.paint();
//     }
// }
