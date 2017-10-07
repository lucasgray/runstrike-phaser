import Projectile from "./Projectile";
import GridDescriptor from "../../state/GridDescriptor";

export class AutoShot extends Projectile {

    defaultWidth: number = 26;
    defaultHeight: number = 26;
    range: number = 500;
    speed: number = 700;
    shootSound: string = 'shoot';
    scaleFactor = .8;

    constructor(game: Phaser.Game, fromX: number, fromY: number, angle: number, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor) {
        super(game, fromX, fromY, angle, toSprite, 'aa-shot-01');

        super.paint(gridDescriptor);
    }

    playShotFx(): void {

        let fx = new Phaser.Sprite(this.game, this.x, this.y, 'weapon-explosion-sm');
        fx.anchor.setTo(.5);
        fx.angle = this.angle;
        this.game.add.existing(fx);
        let anim = fx.animations.add('a');
        fx.animations.play('a', 40, false);
        anim.onComplete.add(() => fx.destroy());
    }
}

export class SmallRocket extends Projectile {

    defaultWidth: number = 64;
    defaultHeight: number = 64;
    range: number = 500;
    speed: number = 200;
    shootSound: string = 'shoot';

    constructor(game: Phaser.Game, fromX: number, fromY: number, angle: number, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor) {
        super(game, fromX, fromY, angle, toSprite, 'blue-missile-projectile');

        super.paint(gridDescriptor);
    }

    playShotFx(): void {
        throw new Error("Method not implemented.");
    }
}
