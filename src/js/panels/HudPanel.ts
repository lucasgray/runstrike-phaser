import SetupTurretInputHandler from "../handlers/SetupTurretInputHandler";
import { StandardTurretHandler, HeavyTurretHandler} from "../handlers/TurretHandlers";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";
import SpriteExtensions from "../extensions/SpriteExtensions";
import _ = require("lodash");

export default class HudPanel extends Phaser.Sprite {

    topLeft: Phaser.Point;

    game: Phaser.Game;

    accentColor: string = "#03C1BF";

    width: number;
    height: number;

    enemyFormationString: Phaser.Text;
    baseHealthString: Phaser.Text;
    perimeter: Phaser.Text;

    mission: Mission;

    constructor(game: Phaser.Game, topLeft: Phaser.Point, mission: Mission) {

        super(game, topLeft.x, topLeft.y);
        this.game = game;
        this.topLeft = topLeft;

        this.width = mission.gridDescriptor.cellWidth * 2.5;
        this.height = mission.gridDescriptor.cellHeight * 3.75;

        this.mission = mission;

        this.paint(mission);
    }

    paint(mission) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0x22092d, .6);
        graphics.lineStyle(2, Phaser.Color.hexToRGB(this.accentColor));
        graphics.drawRect(0, 0, this.width - 2, this.height - 2);

        let rectSprite = this.game.add.sprite(this.topLeft.x, this.topLeft.y, graphics.generateTexture());
        graphics.destroy();

        this.addChild(rectSprite);
        this.game.add.existing(rectSprite);

        this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 15, "Enemy Formation", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

        this.enemyFormationString  = this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 30, "> STRONG", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

        this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 50, "Sensor Readings", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

        this.baseHealthString  = this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 65, "> 10000 / 10000", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

        this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 85, "Perimeter", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

        this.perimeter  = this.game.add.text(this.topLeft.x + 5, this.topLeft.y + 100, "> OK", {
            font: 'Joystix',
            fill: this.accentColor,
            align: 'left',
            fontSize: 11
        });

    }

    update() {

        let alive = this.mission.enemyArray.length - this.mission.enemies.countDead();
        let amtToDeploy = this.mission.enemyArray.length;
        let pct = alive / amtToDeploy;

        let formationText = "> STRONG";
        if (pct > .25 && pct < .75) {
            formationText = "> WEAK";
        } else if (pct < .25) {
            formationText = "> CRITICAL";
        }

        this.enemyFormationString.setText(formationText);

        let baseHealthString = "> " + this.mission.currentBase.health + " / " + this.mission.currentBase.maxHealth
        this.baseHealthString.setText(baseHealthString);

        let turretHealths = this.mission.turrets.all().map(t => t.health / t.maxHealth);
        let avgTurretHealth = _.sum(turretHealths) / this.mission.turrets.length;

        let perimeterHealth = "> STRONG";
        if (avgTurretHealth > .25 && avgTurretHealth < .75) {
            perimeterHealth = "> WEAK";
        } else if (avgTurretHealth < .25) {
            perimeterHealth = "> CRITICAL";
        }

        this.perimeter.setText(perimeterHealth);
    }


}
