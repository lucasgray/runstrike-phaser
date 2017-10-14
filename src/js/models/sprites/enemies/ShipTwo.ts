import Mission from "../../../missions/Mission";
import {PathfindingEnemy} from "./Enemy";
import PercentBar from "./PercentBar";

export default class ShipTwo extends PathfindingEnemy {

    defaultWidth = 77;
    defaultHeight = 73;
    animationFrameRate = -1;
    rotatingSprite = false;
    scaleFactor = 1.35;
    range = 200;
    fireRate = 20;

    ship: Phaser.Sprite;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, mission, '', 10);

        this.paint(mission, row, col);
        this.addHealthbar(6000);
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
        let ship = new Phaser.Sprite(this.game, 0, 0, 'ship-02');
        ship.angle = this.angle;
        ship.rotation = this.rotation;
        ship.anchor.setTo(.5);

        let shipShadow = new Phaser.Sprite(this.game, -24, 22, 'ship-02');
        shipShadow.anchor.set(0.5);
        shipShadow.tint = 0x191919;
        shipShadow.alpha = 0.6;

        this.game.add.tween(ship).to( { x: '+12', y: '-12' }, 8000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
        this.game.add.tween(shipShadow).to( { x: '+4', y: '-4' }, 8000, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

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
