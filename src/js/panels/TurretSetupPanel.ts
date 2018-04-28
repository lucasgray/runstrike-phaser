import SetupTurretInputHandler from "../handlers/SetupTurretInputHandler";
import {HeavyTurretHandler, StandardTurretHandler} from "../handlers/TurretHandlers";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";
import SpriteExtensions from "../extensions/SpriteExtensions";
import WrenchHandler from "../handlers/WrenchHandler";
import InputHandler from "../handlers/InputHandler";

export default class TurretSetupPanel {

    topLeft: Phaser.Point;
    sprite: Phaser.Sprite;

    game: Phaser.Game;

    accentColor: string = "#03C1BF";

    width: number;
    height: number;

    handlers: Array<InputHandler>;

    constructor(game: Phaser.Game, topLeft: Phaser.Point, mission: Mission, gameState: GameState, backgroundSprite: Phaser.Sprite) {

        this.game = game;
        this.topLeft = topLeft;
        this.sprite = game.add.sprite(topLeft.x, topLeft.y);
        this.width = mission.gridDescriptor.cellWidth * 2;
        this.height = mission.gridDescriptor.cellHeight * 6;

        this.paint(mission, gameState, backgroundSprite);
    }

    paint(mission, gameState: GameState, backgroundSprite) {
        let graphics = this.game.add.graphics(this.topLeft.x, this.topLeft.y);
        graphics.beginFill(0x22092d, .8);
        graphics.lineStyle(2, Phaser.Color.hexToRGB(this.accentColor));
        graphics.drawRect(0, 0, this.width, this.height);

        let parentSprite = this.game.add.sprite(this.topLeft.x, this.topLeft.y, graphics.generateTexture());
        graphics.destroy();

        let allHandlers = Array<InputHandler>();

        let startX = this.topLeft.x + mission.gridDescriptor.cellWidth;
        let startY = this.topLeft.y + mission.gridDescriptor.cellHeight;
        allHandlers.push(new StandardTurretHandler(mission, gameState, allHandlers, backgroundSprite, this.game, startX, startY));
        allHandlers.push(new HeavyTurretHandler(mission, gameState, allHandlers, backgroundSprite, this.game, startX, startY + 85));
        allHandlers.push(new WrenchHandler(
            mission,
            gameState,
            allHandlers,
            mission.turrets.all(),
            this.game,
            startX,
            startY + (85 * 2)));

        this.handlers = allHandlers;

        let readyButton = new Button(
            this.game,
            0,
            0,
            85,
            40,
            'OK', () => {
                console.log("rdy!!");
                gameState.finishSetup(this.game, mission)
            }
        );
        parentSprite.addChild(readyButton.baseSprite);
        SpriteExtensions.alignInParent(readyButton.baseSprite, parentSprite, Phaser.BOTTOM_CENTER, 0, -10);
    }

    destroy() {
        this.sprite.destroy();
    }

}
