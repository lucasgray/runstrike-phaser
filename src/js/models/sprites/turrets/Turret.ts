import * as _ from 'lodash';
import Projectile from '../projectiles/Projectile';
import Mission from "../../../missions/Mission";
import Drone from "../enemies/Drone";
import {Enemy} from "../enemies/Enemy";

abstract class Turret extends Phaser.Sprite {

    mission: Mission;

    lastShot: number;

    row: number;
    col: number;

    rotationTween: Phaser.Tween;
    tracking: Enemy;

    abstract range: number;
    abstract fireRate: number;
    abstract shoot: () => Projectile;

    base: Phaser.Sprite;
    turret: Phaser.Sprite;

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number, texture: string, offsetX: number, offsetY: number) {
        super(game, 0, 0, '');

        this.mission = mission;

        //get the right cell, then place into center of cell
        this.x = (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        let defaultSize = {width: 64, height: 64};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;
        this.anchor.setTo(0.5);
        this.scale.setTo(scaleX, scaleY);
        this.inputEnabled = false;

        this.lastShot = 0;

        let base = new Phaser.Sprite(game, this.x, this.y, 'turret-base');
        base.anchor.setTo(0.5);
        base.scale.setTo(scaleX, scaleY);
        base.tint = 0xfffff;
        this.game.add.existing(base);
        this.base = base;

        let turret = new Phaser.Sprite(game, offsetX, offsetY, texture);
        this.game.physics.enable(turret, Phaser.Physics.ARCADE);
        turret.anchor.setTo(0.5);
        turret.scale.setTo(scaleX, scaleY);
        turret.tint = 0xfffff;
        this.game.add.existing(turret);
        this.turret = turret;

        let turretShadow = new Phaser.Sprite(game, offsetX - 4, offsetY + 2, texture);
        turretShadow.anchor.set(0.5);
        turretShadow.tint = 0x191919;
        turretShadow.alpha = 0.6;

        this.addChild(turretShadow);
        this.addChild(turret);
    }

    update() {

        //turrets should always be aiming (rotating) towards the current enemy,
        //then when the timer is up it shoots!

        //we either have a current enemy or we dont. if we do, and its alive,
        //rotate with it

        //if we dont. and there are others alive, start moving towards that one (slowly)
        //that means start angular velocity (left or right?) until we == or >= the angle we need
        //then keep rotating

        //just periodically shoot on a timer

        this.doRotation();
        this.maybeShoot();
    }

    doRotation() {

        //if we're rotating to a tween do nothing
        if (this.rotationTween && this.rotationTween.isRunning) return;

        let sprite = this.closestEnemy();

        if (!sprite) return;

        //if its a new sprite or the current tracking sprite is dead, tween the rotation to it
        if (sprite !== this.tracking || !this.tracking.alive) {
            this.tracking = sprite;

            //where we need to be
            let angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.x, this.y, sprite.x, sprite.y)) + 90;

            //figure out the best rotation (do we go negative or positive?)
            let bestAngle = Phaser.Math.getShortestAngle(this.angle, angle);
            let tween = this.game.add.tween(this).to({angle: this.angle + bestAngle}, 400, Phaser.Easing.Linear.None);
            tween.start();

            this.rotationTween = tween;
            //else keep tracking it
        } else {
            this.angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.x, this.y, sprite.x, sprite.y)) + 90;
        }
    }

    maybeShoot() {
        //shoot if we havent shot in over a second (give or take some randomness,
        //and we're tracking a body,
        //and that body is relatively close to us
        if (Date.now() - this.lastShot > (this.fireRate + (Math.random() * 200))
            && this.tracking && this.tracking.alive && this.tracking.body.velocity
            && Phaser.Math.distance(this.x, this.y, this.tracking.x, this.tracking.y) < this.range) {

            let projectile = this.shoot();
            this.game.add.existing(projectile);
            this.mission.projectiles.add(projectile);
            this.lastShot = Date.now();
        }
    }

    closestEnemy(): Enemy | null {

        let spriteDistances = this.mission.enemies
            .all()
            .filter(s => s.alive && s.targetable)
            .map((sprite) => {
                    return {
                        distance: Math.abs(sprite.x - this.x) + Math.abs(sprite.y - this.y),
                        sprite: sprite
                    };
                }
            );

        if (spriteDistances) {
            let s = _.minBy(spriteDistances, (s) => s.distance);
            if (s) {
                return s.sprite;
            }
            return null;
        }

        return null;
    }

}

export default Turret;
