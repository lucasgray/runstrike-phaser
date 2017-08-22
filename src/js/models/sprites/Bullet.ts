
export default class Bullet extends Phaser.Sprite {

    fromSprite: Phaser.Sprite;
    toSprite: Phaser.Sprite;

    range: number;
    speed: number = 300;

    constructor(game: Phaser.Game, fromSprite: Phaser.Sprite, toSprite: Phaser.Sprite, range: number) {
        super(game, fromSprite.x, fromSprite.y, 'blue-missile-projectile');

        this.game = game;
        this.range = range;
        this.fromSprite = fromSprite;
        this.toSprite = toSprite;

        this.animations.add('bullet');
        this.animations.play('bullet', 8, false);

        this.anchor.setTo(0.5);
        this.angle = fromSprite.angle;
        game.physics.arcade.enable(this);

        let halfXVelocity = toSprite.body.velocity.x / 2;
        let halfYVelocity = toSprite.body.velocity.y / 2;

        let toX = toSprite.x + halfXVelocity;
        let toY = toSprite.y + halfYVelocity;

        this.angle = Phaser.Math.radToDeg(game.physics.arcade.moveToXY(this, toX, toY, this.speed)) + 90;

        let shootSound = game.add.audio('shoot');
        shootSound.play();
    }

    update() {
        if (Phaser.Math.distance(this.x, this.y, this.fromSprite.x, this.fromSprite.y) > this.range) {
            this.kill();
            this.destroy();
        }
    }

}



