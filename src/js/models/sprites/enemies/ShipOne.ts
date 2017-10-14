import Mission from "../../../missions/Mission";
import {PathfindingEnemy} from "./Enemy";
import PercentBar from "./PercentBar";

export default class ShipOne extends PathfindingEnemy {

    defaultWidth = 89;
    defaultHeight = 77;
    animationFrameRate = -1;
    rotatingSprite = false;
    scaleFactor = 1.35;
    range = 200;
    fireRate = 20;

    ship: Phaser.Sprite;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, '', 20);

        this.paint(mission, row, col);
        this.addHealthbar(600);
        this.makeWeaponSystem();
        this.pathfindToBase(mission, row, col);

        //hide us
        this.visible = true;
    }

    addHealthbar(health: number) {
        this.health = health;
        this.maxHealth = health;
        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new PercentBar(this.game, this, this.ship, 5, this.scaleFactor, Phaser.TOP_CENTER));
    }

    paint(mission: Mission, row: number, col: number) {
        super.paint(mission, row, col);

        //show tweening ship
        let ship = new Phaser.Sprite(this.game, 0, 0, 'ship-01');
        ship.angle = this.angle;
        ship.rotation = this.rotation;
        ship.anchor.setTo(.5);

        let shipShadow = new Phaser.Sprite(this.game, -24, 22, 'ship-01');
        shipShadow.anchor.set(0.5);
        shipShadow.tint = 0x191919;
        shipShadow.alpha = 0.6;
        shipShadow.blendMode = PIXI.blendModes.LUMINOSITY;

        this.game.add.tween(ship).to( { x: '+8', y: '-8' }, 8000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
        this.game.add.tween(shipShadow).to( { x: '+2', y: '-2' }, 8000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

        this.addChild(shipShadow);
        this.addChild(ship);

        this.ship = ship;
    }



    kill() {
        super.kill();

        this.deathSequences.basicDeathSequence();

        this.destroy();

        return this;
    }
}
