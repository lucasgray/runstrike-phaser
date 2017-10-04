import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import BlueBlob from "../projectiles/BlueBlob";
import SmallRocket from "../projectiles/SmallRocket";
import GreenBlob from "../projectiles/GreenBlob";
import SpriteExtensions from "../../../extensions/SpriteExtensions";

export class StandardTurret extends Turret {

    range: number = 300;
    fireRate: number = 200;

    leftShootPoint: Phaser.Sprite;
    rightShootPoint: Phaser.Sprite;

    doLeft: boolean = false;

    static OFFSET_X = 9;
    static OFFSET_Y = -15;

    shoot: () => Projectile = () => {

        this.doLeft = !this.doLeft;

        let shootPoint = this.doLeft? this.leftShootPoint: this.rightShootPoint;

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
            console.log('created...');
            return new SmallRocket(
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
        super(mission, game, row, col, 'turret-1', StandardTurret.OFFSET_X, StandardTurret.OFFSET_Y);

        this.init();
    }

    init() {

        let leftShootPoint = new Phaser.Sprite(this.game, 0, 0);
        leftShootPoint.anchor.setTo(.5);
        SpriteExtensions.alignInParent(
            leftShootPoint,
            this.turret,
            Phaser.TOP_LEFT,
            StandardTurret.OFFSET_X - 8,
            StandardTurret.OFFSET_Y + 45);
        let rightShootPoint = new Phaser.Sprite(this.game, 0, 0);
        rightShootPoint.anchor.setTo(.5);
        SpriteExtensions.alignInParent(
            rightShootPoint,
            this.turret,
            Phaser.TOP_RIGHT,
            StandardTurret.OFFSET_X - 6,
            StandardTurret.OFFSET_Y + 45);

        this.game.add.existing(leftShootPoint);
        this.game.add.existing(rightShootPoint);

        this.leftShootPoint = leftShootPoint;
        this.rightShootPoint = rightShootPoint;

        this.addChild(leftShootPoint);
        this.addChild(rightShootPoint);

        this.doLeft = true;
    }

}

// export class BlueTurret extends Turret {
//
//     range: number = 300;
//     fireRate: number = 900;
//     shoot: () => Projectile = () => new BlueBlob(this.game, this, this.tracking, this.mission.gridDescriptor);
//
//     constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
//         super(mission, game, row, col, 'blue-turret');
//     }
//
// }
//
// export class RedTurret extends Turret {
//
//     range: number = 300;
//     fireRate: number = 500;
//     shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);
//
//     constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
//         super(mission, game, row, col, 'red-turret');
//     }
//
// }
//
// export class YellowTurret extends Turret {
//
//     range: number = 300;
//     fireRate: number = 500;
//     shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);
//
//     constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
//         super(mission, game, row, col, 'yellow-turret');
//     }
//
// }
//
// export class OrangeTurret extends Turret {
//
//     range: number = 300;
//     fireRate: number = 500;
//     shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);
//
//     constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
//         super(mission, game, row, col, 'orange-turret');
//     }
//
// }
//
// export class GreenTurret extends Turret {
//
//     range: number = 300;
//     fireRate: number = 900;
//     shoot: () => Projectile = () => new GreenBlob(this.game, this, this.tracking, this.mission.gridDescriptor);
//
//     constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
//         super(mission, game, row, col, 'green-turret');
//     }
//
// }
