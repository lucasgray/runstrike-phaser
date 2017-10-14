import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import { AutoShot } from "../projectiles/Projectiles";
import SpriteExtensions from "../../../extensions/SpriteExtensions";
import {Targetable} from "../../state/WeaponSystem";

export class AutoTurret extends Turret {

    range: number = 800;
    fireRate: number = 100;

    leftShootPoint: Phaser.Sprite;
    rightShootPoint: Phaser.Sprite;

    doLeft: boolean = false;

    static OFFSET_X = 9;
    static OFFSET_Y = -15;

    static SHOOT_POINT_LEFT_X = 9;
    static SHOOT_POINT_RIGHT_X = -2;
    static SHOOT_POINT_Y = 48;

    shoot = (to: Targetable, mission: Mission) => {

        this.doLeft = !this.doLeft;

        let shootPoint = this.doLeft? this.leftShootPoint: this.rightShootPoint;

        this.makeMuzzleFlash(shootPoint);

        let bullet = mission.friendlyProjectiles.getFirstDead(true);
        if (bullet) {
            bullet.reset(shootPoint.world.x, shootPoint.world.y);
            bullet.fromX = shootPoint.world.x;
            bullet.fromY = shootPoint.world.y;
            bullet.angle = this.angle;
            bullet.toSprite = to;
            bullet.gridDescriptor = this.mission.gridDescriptor;
            bullet.paint(this.mission.gridDescriptor);
            return bullet;
        } else {
            return new AutoShot(
                this.game,
                shootPoint.world.x,
                shootPoint.world.y,
                to,
                this.mission.gridDescriptor,
                this.mission.projectileExplosions
            );
        }
    };

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'turret-1', AutoTurret.OFFSET_X, AutoTurret.OFFSET_Y);

        this.init();
        this.addHealthbar(1000);
        this.makeWeaponSystem(this.range, this.fireRate, this.mission, this.shoot);
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

        let muzzleFlash : Phaser.Sprite = this.mission.muzzleFlashes.getFirstDead(false);

        if (muzzleFlash) {
            muzzleFlash.reset(shootPoint.world.x, shootPoint.world.y);
            muzzleFlash.resetFrame();
        } else {
            muzzleFlash = new Phaser.Sprite(this.game, shootPoint.world.x, shootPoint.world.y, 'weapon-muzzleflash');
            this.game.add.existing(muzzleFlash);
            muzzleFlash.animations.add('a');
        }

        muzzleFlash.anchor.setTo(.5);
        muzzleFlash.angle = this.angle;
        let anim = muzzleFlash.animations.play('a', 40, false);
        anim.onComplete.add(() => muzzleFlash.kill());
        this.mission.muzzleFlashes.add(muzzleFlash);
    }

}

// export default class HeavyTurret extends Turret {
//
// }
