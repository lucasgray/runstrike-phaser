import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import {AutoShot, SmallRocket} from "../projectiles/Projectiles";
import SpriteExtensions from "../../../extensions/SpriteExtensions";

export class AutoTurret extends Turret {

    range: number = 400;
    fireRate: number = 150;

    leftShootPoint: Phaser.Sprite;
    rightShootPoint: Phaser.Sprite;

    doLeft: boolean = false;

    static OFFSET_X = 9;
    static OFFSET_Y = -15;

    static SHOOT_POINT_LEFT_X = 9;
    static SHOOT_POINT_RIGHT_X = -2;
    static SHOOT_POINT_Y = 48;

    shoot: () => Projectile = () => {

        this.doLeft = !this.doLeft;

        let shootPoint = this.doLeft? this.leftShootPoint: this.rightShootPoint;

        this.makeMuzzleFlash(shootPoint);

        let bullet = this.mission.projectiles.getFirstDead(true);
        if (bullet) {
            bullet.reset(shootPoint.world.x, shootPoint.world.y);
            bullet.fromX = shootPoint.world.x;
            bullet.fromY = shootPoint.world.y;
            bullet.angle = this.angle;
            bullet.toSprite = this.tracking;
            bullet.gridDescriptor = this.mission.gridDescriptor;
            bullet.paint(this.mission.gridDescriptor);
            return bullet;
        } else {
            return new AutoShot(
                this.game,
                shootPoint.world.x,
                shootPoint.world.y,
                this.angle,
                this.tracking,
                this.mission.gridDescriptor
            );
        }
    };

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'turret-1', AutoTurret.OFFSET_X, AutoTurret.OFFSET_Y);

        this.init();
    }

    init() {

        let leftShootPoint = new Phaser.Sprite(this.game, 0, 0);
        leftShootPoint.anchor.setTo(.5);
        SpriteExtensions.alignInParent(
            leftShootPoint,
            this.turret,
            Phaser.TOP_LEFT,
            AutoTurret.OFFSET_X - AutoTurret.SHOOT_POINT_LEFT_X,
            AutoTurret.OFFSET_Y + AutoTurret.SHOOT_POINT_Y);
        let rightShootPoint = new Phaser.Sprite(this.game, 0, 0);
        rightShootPoint.anchor.setTo(.5);
        SpriteExtensions.alignInParent(
            rightShootPoint,
            this.turret,
            Phaser.TOP_RIGHT,
            AutoTurret.OFFSET_X + AutoTurret.SHOOT_POINT_RIGHT_X,
            AutoTurret.OFFSET_Y + AutoTurret.SHOOT_POINT_Y);

        this.game.add.existing(leftShootPoint);
        this.game.add.existing(rightShootPoint);

        this.leftShootPoint = leftShootPoint;
        this.rightShootPoint = rightShootPoint;

        this.addChild(leftShootPoint);
        this.addChild(rightShootPoint);

        this.doLeft = true;
    }

    private makeMuzzleFlash(shootPoint: Phaser.Sprite) {
        let muzzleFlash = new Phaser.Sprite(this.game, shootPoint.world.x, shootPoint.world.y, 'weapon-muzzleflash');
        muzzleFlash.anchor.setTo(.5);
        muzzleFlash.angle = this.angle;
        this.game.add.existing(muzzleFlash);
        let anim = muzzleFlash.animations.add('a');
        muzzleFlash.animations.play('a', 40, false);
        anim.onComplete.add(() => muzzleFlash.destroy());
    }

}

// export default class HeavyTurret extends Turret {
//
// }
