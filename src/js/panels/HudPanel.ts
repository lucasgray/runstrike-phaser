import SetupTurretInputHandler from "../handlers/SetupTurretInputHandler";
import { StandardTurretHandler, HeavyTurretHandler} from "../handlers/TurretHandlers";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";
import SpriteExtensions from "../extensions/SpriteExtensions";

export default class HudPanel extends Phaser.Sprite {

    topLeft: Phaser.Point;

    game: Phaser.Game;

    accentColor: string = "#03C1BF";

    width: number;
    height: number;

    enemyFormationString: string;
    baseHealthString: string;
    perimeter: string;

    constructor(game: Phaser.Game, topLeft: Phaser.Point, mission: Mission) {

        super(game, topLeft.x, topLeft.y);
        this.game = game;
        this.topLeft = topLeft;

        this.width = mission.gridDescriptor.cellWidth * 2;
        this.height = mission.gridDescriptor.cellHeight * 3;

        this.enemyFormationString = "> STRONG";
        this.baseHealthString = "> " + mission.currentBase.health + " / " + mission.currentBase.maxHealth;
        this.perimeter = "> UNDER ATTACK";

        this.paint(mission);
    }

    paint(mission) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0x000000, .6);
        graphics.lineStyle(2, Phaser.Color.hexToRGB(this.accentColor));
        graphics.drawRect(0, 0, this.width - 2, this.height - 2);

        let rectSprite = this.game.add.sprite(this.topLeft.x, this.topLeft.y, graphics.generateTexture());
        graphics.destroy();

        this.addChild(rectSprite);
        this.game.add.existing(rectSprite);
    }

    // update() {
    //
    //     let formationHeader = this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 5, "Enemy Formation", {
    //         font: 'Joystix',
    //         fill: this.accentColor,
    //         align: 'left',
    //         fontSize: 9
    //     });
    //
    //     let formationString = this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 15, this.enemyFormationString, {
    //         font: 'Joystix',
    //         fill: this.accentColor,
    //         align: 'left',
    //         fontSize: 9
    //     });
    //
    //
    //     // this.addChild(formation);
    // }

    //
    // destroy() {
    //     this.sprite.destroy();
    // }

}
