import * as _ from 'lodash';
import Bullet from './Bullet';
import Mission from "../../missions/Mission";
import MathExtensions from "../../extensions/MathExtensions";

export default class Turret extends Phaser.Sprite {

    mission: Mission;

    lastShot: number;

    row: number;
    col: number;

    rotationTween: Phaser.Tween;
    tracking: Phaser.Sprite;

    range: number = 300;
    fireRate: number = 500;


    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(game, 0, 0, 'turret');

        this.mission = mission;

        //compensate for offset, then get the right cell, then place into center of cell
        this.x = mission.gridDescriptor.offsetX + (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = mission.gridDescriptor.offsetY + (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        let defaultSize = {width: 32, height: 32};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;
        this.anchor.setTo(0.5);
        this.scale.setTo(scaleX, scaleY);
        this.inputEnabled = true;

        this.lastShot = 0;
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

        let sprite = this.closestSprite();

        if (!sprite) return;

        //if its a new sprite or the current tracking sprite is dead, tween the rotation to it
        if (sprite !== this.tracking || !this.tracking.alive) {
            this.tracking = sprite;

            //where we need to be
            let angle = MathExtensions.calcRotationAngle(this, sprite, false);

            //figure out the best rotation (do we go negative or positive?)
            let bestRotation = MathExtensions.getRotationVectorForSprite(this, angle);
            let tween = this.game.add.tween(this).to({'rotation': bestRotation}, 600, Phaser.Easing.Linear.None);
            tween.start();

            this.rotationTween = tween;
            //else keep tracking it
        } else {
            this.body.rotation = MathExtensions.calcRotationAngle(this,sprite);
        }
    }

    maybeShoot() {
        //shoot if we havent shot in over a second (give or take some randomness,
        //and we're tracking a body,
        //and that body is relatively close to us
        if (Date.now() - this.lastShot > (this.fireRate + (Math.random() * 200))
            && this.tracking && this.tracking.alive && this.tracking.body.velocity
            && Phaser.Math.distance(this.x, this.y, this.tracking.x, this.tracking.y) < this.range) {

            let bullet = new Bullet(this.game, this, this.tracking, this.range);
            this.game.add.existing(bullet);
            this.mission.bullets.add(bullet);
            this.lastShot = Date.now();
        }
    }

    closestSprite(): Phaser.Sprite | null {

        let spriteDistances = this.mission.enemies.hash
            //TODO hacky hack - groups have display objects, but we know our group just has Sprites
            //groups can contain things that dont necessarily have the prop 'alive'
            .filter(s => s['alive'])
            .map((sprite) => {
                return {
                    distance: Math.abs(sprite.x - this.x) + Math.abs(sprite.y - this.y),
                    sprite: sprite
                };
            }
        );

        if (spriteDistances) {
            let rslt = _.minBy(spriteDistances, (s) => s.distance);
            if (rslt) {
                return rslt.sprite;
            }
        }

        return null;
    }

}
