
import GridDescriptor from "../models/state/GridDescriptor";
import SetupTurretInputHandler from "../handlers/SetupTurretInputHandler";
import StandardTurretHandler from "../handlers/TurretHandlers";
import InputHandler from "../handlers/InputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";
import SpriteExtensions from "../extensions/SpriteExtensions";
import StandardMap from "../effects/StandardMap";

export default class TurretSetupPanel {

    topLeft: Phaser.Point;
    sprite: Phaser.Sprite;

    game: Phaser.Game;

    accentColor: string = "#03C1BF";

    width: number ;
    height: number;

    handlers: Array<SetupTurretInputHandler>;

    constructor(game: Phaser.Game, topLeft: Phaser.Point, mission: Mission, gameState: GameState, backgroundSprite: Phaser.Sprite) {

        this.game = game;
        this.topLeft = topLeft;
        this.sprite = game.add.sprite(topLeft.x, topLeft.y);
        this.width = mission.gridDescriptor.cellWidth * 2;
        this.height = mission.gridDescriptor.cellHeight * 4;

        this.paint(mission, gameState, backgroundSprite);
    }

    paint(mission, gameState, backgroundSprite) {
        let graphics = this.game.add.graphics(this.topLeft.x, this.topLeft.y);
        graphics.beginFill(0x000000, .6);
        graphics.lineStyle(2, Phaser.Color.hexToRGB(this.accentColor));
        graphics.drawRect(0, 0, this.width, this.height);

        let parentSprite = this.game.add.sprite(this.topLeft.x, this.topLeft.y, graphics.generateTexture());
        graphics.destroy();

        let allTurretHandlers = Array<InputHandler>();

        let startX = this.topLeft.x + mission.gridDescriptor.cellWidth;
        let startY = this.topLeft.y + mission.gridDescriptor.cellHeight;
        allTurretHandlers.push(new StandardTurretHandler(mission, gameState, allTurretHandlers, backgroundSprite, this.game, startX, startY));

        let readyButton = new Button(
            this.game,
            0,
            0,
            85,
            40,
            'ready', () => {
                console.log("asking to defend");
                this.game.state.start('Play', true, false, mission, gameState);
            }
        );
        parentSprite.addChild(readyButton.baseSprite);

        SpriteExtensions.alignInParent(readyButton.baseSprite, parentSprite, Phaser.BOTTOM_CENTER, 0, -10);
    }

    destroy() {
        this.sprite.destroy();
    }

}
