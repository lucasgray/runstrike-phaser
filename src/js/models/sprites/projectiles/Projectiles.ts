import Projectile from "./Projectile";
import GridDescriptor from "../../state/GridDescriptor";

export class AutoShot extends Projectile {

    defaultWidth: number = 26;
    defaultHeight: number = 26;
    range: number = 500;
    speed: number = 700;
    shootSound: string = 'shoot';
    scaleFactor = .8;

    constructor(game: Phaser.Game, fromX: number, fromY: number, angle: number, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor, projectileExplosionGroup: Phaser.Group) {
        super(game, fromX, fromY, angle, toSprite, 'aa-shot-01', projectileExplosionGroup);

        super.paint(gridDescriptor);
    }

    playShotFx(): void {

        let fx : Phaser.Sprite = this.projectileExplosionGroup.getFirstDead(false);

        if (fx) {
            fx.reset(this.x, this.y);
            fx.resetFrame();
        } else {
            fx = new Phaser.Sprite(this.game, this.x, this.y, 'weapon-explosion-sm');
            this.game.add.existing(fx);
            fx.animations.add('a');
        }

        fx.anchor.setTo(.5);
        fx.angle = this.angle;

        let randomRotation = Math.random() * 360;

        fx.rotation = Phaser.Math.degToRad(randomRotation);

        let anim = fx.animations.play('a', 40, false);
        anim.onComplete.add(() => fx.kill());
        this.projectileExplosionGroup.add(fx);
    }
}
