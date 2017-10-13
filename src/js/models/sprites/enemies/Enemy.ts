import Mission from "../../../missions/Mission";
import * as _ from 'lodash';
import PercentBar from "./PercentBar";
import Projectile from "../projectiles/Projectile";
import {AutoShot} from "../projectiles/Projectiles";
import {Targetable, WeaponSystem} from "../../state/WeaponSystem";
import DeathSequences from "../../../effects/DeathSequences";

export abstract class Enemy extends Phaser.Sprite implements Targetable {

    mission: Mission;

    abstract defaultWidth : number;
    abstract defaultHeight: number;
    abstract animationFrameRate: number;
    abstract rotatingSprite: boolean;

    scaleFactor = 1;

    randomVelocity: number;

    targetable: boolean;

    healthBar: PercentBar;
    explodeSound: () => Phaser.Sound;

    weaponSystem: WeaponSystem;
    deathSequences: DeathSequences;

    range: 450;
    fireRate: 200;

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, 0, 0, texture);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.mission = mission;

        this.randomVelocity =  speed + (Math.random() * (speed * .4));
        this.targetable = true;

        this.deathSequences = new DeathSequences(this, this.mission);

        this.explodeSound = () => {

            let sound;
            if (Math.random() > .5) {
                sound = game.add.audio('crash-1');
            } else {
                sound = game.add.audio('crash-2');
            }

            return sound;
        };

        this.weaponSystem = new WeaponSystem(this, this.mission, this.range, this.fireRate, mission.turrets, mission.enemyProjectiles, this.shoot);
    }

    paint(mission: Mission, row: number, col: number) {
        //get the right cell, then place into center of cell
        this.x = (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        let defaultSize = {width: this.defaultWidth, height: this.defaultHeight};
        let scaleX = (this.mission.gridDescriptor.cellWidth / defaultSize.width) * this.scaleFactor;
        let scaleY = (this.mission.gridDescriptor.cellHeight / defaultSize.height) * this.scaleFactor;

        if (this.animationFrameRate != -1) {
            this.animations.add('move');
            this.animations.play('move', this.animationFrameRate, true);
        }
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        if (this.rotatingSprite) {
            // default to immediately south
            this.angle = 180;
        }
    }

    addHealthbar(health: number) {
        this.health = health;
        this.maxHealth = health;
        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new PercentBar(this.game, this, this, 5, this.scaleFactor, Phaser.TOP_LEFT));
    }

    shot(by: Projectile) {
        this.damage(by.damageAmount);
        by.playShotFx();
    }

    kill() {
        this.healthBar.hide();
        this.healthBar.destroy();
        this.explodeSound().play();
        this.targetable = false;
        this.alive = false;

        return this;
    }

    update() {
        super.update();
        this.weaponSystem.update();
    }

    shoot = (to: Targetable, mission: Mission) => {
        let bullet = mission.enemyProjectiles.getFirstDead(true);

        if (bullet) {
            bullet.reset(this.x, this.y);
            bullet.fromX = this.x;
            bullet.fromY = this.y;
            bullet.angle = this.angle;
            bullet.toSprite = to;
            bullet.gridDescriptor = mission.gridDescriptor;
            bullet.paint(mission.gridDescriptor);
            return bullet;
        } else {
            return new AutoShot(
                this.game,
                this.x,
                this.y,
                to,
                mission.gridDescriptor,
                mission.projectileExplosions
            );
        }
    }
}

export abstract class PathfindingEnemy extends Enemy {

    lastCalculation: number;
    path: {x: number; y: number, seen: boolean}[];

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, mission, texture, speed);

        this.lastCalculation = 0;
    }

    pathfind(mission: Mission, row: number, col: number) {

        //TODO base doesnt need to be in center bottom of map
        this.mission.easystar.findPath(row, col, Math.floor(mission.gridDescriptor.rows / 2), (mission.gridDescriptor.columns - 1), (path) => {
            if (!path) {
                console.log("The path to the destination point was not found.");
            } else {
                console.log("easystar success. ");
                path.forEach((p) => console.log(JSON.stringify(p)));
                this.path = path.map(i => { return {...i, seen: false}});
            }
            this.lastCalculation = Date.now();
        });
    }

    update() {
        super.update();
        this.doPathfinding();
    }

    doPathfinding() {
        if (this.alive && this.targetable && this.path && this.path.length > 0 && _.some(this.path, _ => !_.seen)) {

            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            let cur = this.path.filter(_ => !_.seen)[0];
            let next = cur;

            if (cur) {

                //we want to move towards the CENTER of the next cell..
                let xToGo = cur.x * this.mission.gridDescriptor.cellWidth + Math.floor(this.mission.gridDescriptor.cellWidth / 2);
                let yToGo = cur.y * this.mission.gridDescriptor.cellHeight + Math.floor(this.mission.gridDescriptor.cellHeight / 2);

                //have we made it yet, or are we going for the first time?
                if (_.every(this.path, _ => !_.seen) || (Math.abs(xToGo - this.x) < 10 && Math.abs(yToGo - this.y) < 10)) {
                    console.log('got to next!');
                    cur.seen = true;
                    next = this.path.filter(_ => !_.seen)[0];

                    if (next) {
                        xToGo = next.x * this.mission.gridDescriptor.cellWidth + Math.floor(this.mission.gridDescriptor.cellWidth / 2);
                        yToGo = next.y * this.mission.gridDescriptor.cellHeight + Math.floor(this.mission.gridDescriptor.cellHeight / 2);

                        let a = this.game.physics.arcade.moveToXY(this, xToGo, yToGo, this.randomVelocity);

                        if (this.rotatingSprite) {
                            let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
                            this.game.add.tween(this).to({angle: this.angle + b}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        }
                    }
                }
            }
        }
    }
}

export abstract class FlyingEnemy extends Enemy {

    rotatingSprite: boolean = true;

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, mission, texture, speed);
    }

    flyTowardsBase() {

        //TODO base could be anywhere
        let xToGo = ((this.mission.gridDescriptor.rows / 2) * this.mission.gridDescriptor.cellWidth)
            + (this.mission.gridDescriptor.cellWidth / 2);
        let yToGo = ((this.mission.gridDescriptor.columns - 1) * this.mission.gridDescriptor.cellHeight)
            + (this.mission.gridDescriptor.cellHeight / 2);

        let a = this.game.physics.arcade.moveToXY(this, xToGo, yToGo, this.randomVelocity);

        let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
        this.game.add.tween(this).to({angle: this.angle + b}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

}
