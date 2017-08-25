
abstract class Projectile extends Phaser.Sprite {

    fromSprite: Phaser.Sprite;
    toSprite: Phaser.Sprite;

    abstract range: number;
    abstract speed: number;
    abstract shootSound: string;

    constructor(game: Phaser.Game, fromSprite: Phaser.Sprite, toSprite: Phaser.Sprite, texture: string) {

        super(game, fromSprite.x, fromSprite.y, texture);

        this.game = game;
        this.fromSprite = fromSprite;
        this.toSprite = toSprite;
    }

    paint() {
        this.animations.add('bullet');
        this.animations.play('bullet', 8, false);

        this.anchor.setTo(0.5);
        this.angle = this.fromSprite.angle;
        this.game.physics.arcade.enable(this);

        let halfXVelocity = this.toSprite.body.velocity.x / 2;
        let halfYVelocity = this.toSprite.body.velocity.y / 2;

        let toX = this.toSprite.x + halfXVelocity;
        let toY = this.toSprite.y + halfYVelocity;

        this.angle = Phaser.Math.radToDeg(this.game.physics.arcade.moveToXY(this, toX, toY, this.speed)) + 90;

        let shootAudio = this.game.add.audio(this.shootSound);
        shootAudio.play();
    }

    /**
     * Cull if the projectile gets too far away from the base.
     * Note: Bullet + Sprite collisions are currently handled by the Mission
     */
    update() {
        if (Phaser.Math.distance(this.x, this.y, this.fromSprite.x, this.fromSprite.y) > this.range) {
            this.kill();
            this.destroy();
        }
    }

}

export default Projectile;



