"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Turret = (function (_super) {
    __extends(Turret, _super);
    function Turret(mission, game, x, y) {
        var _this = _super.call(this, game, x, y, 'turret') || this;
        _this.game = game;
        var defaultSize = { width: 32, height: 32 };
        var scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        var scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;
        _this.anchor.setTo(0.5);
        _this.scale.setTo(scaleX, scaleY);
        _this.inputEnabled = true;
        return _this;
        // g.anchor.y = -.1;
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
    Turret.prototype.update = function () {
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
    };
    Turret.prototype.closestSprite = function () {
        // let spriteDistances = this.game.enemies.hash.map((sprite) => {
        //     return {
        //         distance: Math.abs(sprite.x - this.x) + Math.abs(sprite.y - this.y),
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
    };
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
    //         && Phaser.Math.distance(this.x, this.y, this.tracking.x, this.tracking.y) < 100) {
    //         new Bullet(this.game, this, this.tracking);
    //         this.lastShot = Date.now();
    //     }
    // }
    //TODO maybe this stuff should move into a local math lib?
    Turret.prototype.calcRotationAngle = function (centerPt, targetPt, degrees) {
        if (degrees === void 0) { degrees = true; }
        var theta = Math.atan2(targetPt.y - centerPt.y, targetPt.x - centerPt.x);
        theta += Math.PI / 2.0;
        if (!degrees)
            return theta;
        var angle = Phaser.Math.radToDeg(theta);
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    };
    Turret.prototype.getRotationVectorForSprite = function (sprite, desiredRotation) {
        var rotation = 0;
        var turnNegative = -((Math.PI * 2) - (desiredRotation));
        var turnPositive = ((Math.PI * 2) - (desiredRotation));
        var diffDistance = Math.abs(sprite.rotation - turnNegative);
        // math.pi is the center
        if (diffDistance >= Math.PI) {
            rotation = (Math.PI * 2) - turnPositive;
            console.log('positive');
        }
        else {
            rotation = turnNegative - sprite.rotation;
            console.log('negative');
        }
        console.log(rotation);
        return this.game.add.tween(sprite).to({ 'rotation': rotation }, 600, Phaser.Easing.Linear.None);
    };
    return Turret;
}(Phaser.Sprite));
exports["default"] = Turret;
//# sourceMappingURL=Turret.js.map