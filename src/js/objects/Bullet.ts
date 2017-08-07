
export default class Bullet extends Phaser.Sprite {

    fromSprite: Phaser.Sprite;
    toSprite: Phaser.Sprite;

    constructor(game, fromSprite, toSprite) {
        super(game, fromSprite.x, fromSprite.y, 'bullet');

        this.anchor.setTo(0.5);
        this.angle = fromSprite.angle;
        game.physics.arcade.enable(this);
        game.bullets.add(this);

        let halfXVelocity = toSprite.body.velocity.x / 2;
        let halfYVelocity = toSprite.body.velocity.y / 2;

        game.physics.arcade.moveToXY(this, toSprite.x + halfXVelocity, toSprite.y + halfYVelocity, 300);

        let shootSound = game.add.audio('shoot');
        shootSound.play();

        this.game = game;

        this.fromSprite = fromSprite;
        this.toSprite = toSprite;
    }

    update() {
        if (Phaser.Math.distance(this.x, this.y, this.fromSprite.x, this.fromSprite.y) > 50) {
            this.kill();
            this.destroy();
        }
    }

}



