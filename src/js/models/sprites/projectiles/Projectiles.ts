import Projectile from "./Projectile";
import GridDescriptor from "../../state/GridDescriptor";

export class AutoShot extends Projectile {

    defaultWidth: number = 26;
    defaultHeight: number = 26;
    range: number = 500;
    speed: number = 1400;
    shootSound: string = 'shoot';
    scaleFactor = .8;

    constructor(game: Phaser.Game, fromX: number, fromY: number, angle: number, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor, projectileExplosionGroup: Phaser.Group) {
        super(game, fromX, fromY, angle, toSprite, 'aa-shot-01', projectileExplosionGroup);

        super.paint(gridDescriptor);
    }

    playShotFx(): void {

        //arcade collision is good enough for us, p2 is more resource intensive
        //lets just make it look more like the collision happened closer to the body
        //TODO probs should abstract this concept if i like it

        let goalX = this.toSprite.x;
        let goalY = this.toSprite.y;

        let diceRollX = Phaser.Math.random(.3, .8);
        let diceRollY = Phaser.Math.random(.5, .7);

        let curX = this.x;
        let curY = this.y;

        //amt needed to get exactly there, plus/minus some randomness
        let diffX = (goalX - curX) * diceRollX;
        let diffY = (goalY - curY) * diceRollY;

        let fx : Phaser.Sprite = this.projectileExplosionGroup.getFirstDead(false);

        if (fx) {
            fx.reset(this.x + diffX, this.y + diffY);
            fx.resetFrame();
        } else {
            fx = new Phaser.Sprite(this.game, this.x + diffX, this.y + diffY, 'weapon-explosion-sm');
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
