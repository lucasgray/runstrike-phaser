import _ from 'lodash';
import Bullet from './Bullet';
import Mission from "../missions/Mission";

export default class Turret extends Phaser.Sprite {

    game: Phaser.Game;

    constructor(mission: Mission, game : Phaser.Game, row: number, col: number) {
        super(game, 0, 0, 'turret');

        //compensate for offset, then get the right cell, then place into center of cell
        this.x = mission.gridDescriptor.offsetX + (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = mission.gridDescriptor.offsetY + (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.game = game;

        let defaultSize = {width: 32, height: 32};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;
        this.anchor.setTo(0.5);
        this.scale.setTo(scaleX, scaleY);
        this.inputEnabled = true;

        // g.anchor.col = -.1;


        // turret.lastShot = 0;
        // turret.bulletsGroup = base.game.add.physicsGroup();

        // base.update = this.update;
        // base.shootBulletFromTo = this.shootBulletFromTo;
        // base.maybeShoot = this.maybeShoot;
        // base.doRotation = this.doRotation;
        // base.closestSprite = this.closestSprite;
        // base.calcRotationAngle = this.calcRotationAngle;
        // base.getRotationVectorForSprite = this.getRotationVectorForSprite;
        //
        // game.physics.arcade.enable(base);
        //
        // return base;
    }

    update(){

        //turrets should always be aiming (rotating) towards the current enemy,
        //then when the timer is up it shoots!

        //we either have a current enemy or we dont. if we do, and its alive,
        //rotate with it

        //if we dont. and there are others alive, start moving towards that one (slowly)
        //that means start angular velocity (left or right?) until we == or >= the angle we need
        //then keep rotating

        //just periodically shoot on a timer

        // this.doRotation();
        // this.maybeShoot();
    }

    closestSprite() {

        // let spriteDistances = this.game.enemies.hash.map((sprite) => {
        //     return {
        //         distance: Math.abs(sprite.row - this.row) + Math.abs(sprite.col - this.col),
        //         sprite: sprite
        //     };
        // });
        //
        // let spritesInRange = spriteDistances.filter(s => s.sprite.alive);
        //
        // if (spritesInRange) {
        //     let rslt = _.minBy(spritesInRange, (s) => s.distance);
        //     if (rslt) {
        //         return rslt.sprite;
        //     }
        // }
        //
        // return null;
    }

    // doRotation() {
    //
    //     //if we're rotating to a tween do nothing
    //     if (this.rotationTween && this.rotationTween.isRunning) return;
    //
    //     let sprite = this.closestSprite();
    //
    //     if (!sprite) return;
    //
    //     //if its a new sprite tween the rotation to it
    //     if (sprite !== this.tracking) {
    //         this.tracking = sprite;
    //
    //         //where we need to be
    //         let angle = this.calcRotationAngle(this,sprite, false);
    //
    //         //figure out the best rotation (do we go negative or positive?)
    //         let bestRotation = this.getRotationVectorForSprite(this, angle);
    //         bestRotation.start();
    //
    //         this.rotationTween = bestRotation;
    //     //else keep tracking it
    //     } else {
    //         this.body.rotation = this.calcRotationAngle(this,sprite);
    //     }
    // }
    //
    // maybeShoot() {
    //     //shoot if we havent shot in over a second (give or take some randomness,
    //     //and we're tracking a body,
    //     //and that body is relatively close to us
    //     if (Date.now() - this.lastShot > (1000 + (Math.random() * 200))
    //         && this.tracking && this.tracking.alive && this.tracking.body.velocity
    //         && Phaser.Math.distance(this.row, this.col, this.tracking.row, this.tracking.col) < 100) {
    //         new Bullet(this.game, this, this.tracking);
    //         this.lastShot = Date.now();
    //     }
    // }

    //TODO maybe this stuff should move into a local math lib?

    calcRotationAngle(centerPt, targetPt, degrees = true) {
        let theta = Math.atan2(targetPt.y - centerPt.y, targetPt.x - centerPt.x);

        theta += Math.PI / 2.0;

        if (!degrees) return theta;

        let angle = Phaser.Math.radToDeg(theta);

        if (angle < 0) {
            angle += 360;
        }

        return angle;
    }

    getRotationVectorForSprite(sprite, desiredRotation) {
        var rotation = 0;
        var turnNegative = -((Math.PI * 2) - (desiredRotation));
        var turnPositive = ((Math.PI * 2) - (desiredRotation));

        var diffDistance = Math.abs(sprite.rotation - turnNegative)

        // math.pi is the center
        if (diffDistance >= Math.PI) {
            rotation = (Math.PI * 2) - turnPositive;
            console.log('positive')
        } else {
            rotation = turnNegative - sprite.rotation;
            console.log('negative')
        }

        console.log(rotation);

        return this.game.add.tween(sprite).to({'rotation': rotation}, 600, Phaser.Easing.Linear.None);
    }

}
