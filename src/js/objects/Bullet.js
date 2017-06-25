import MapObject from './MapObject';
import _ from 'lodash';

export default class Bullet extends MapObject {

    constructor(game, fromSprite, toSprite) {
        super();

        let bullet = game.add.sprite(fromSprite.x, fromSprite.y, 'bullet');
        bullet.anchor.setTo(0.5);
        bullet.angle = fromSprite.angle;
        game.physics.arcade.enable(bullet);
        game.bullets.add(bullet);

        let halfXVelocity = toSprite.body.velocity.x / 2;
        let halfYVelocity = toSprite.body.velocity.y / 2;

        game.physics.arcade.moveToXY(bullet, toSprite.x + halfXVelocity, toSprite.y + halfYVelocity, 300);

        let shootSound = game.add.audio('shoot');
        shootSound.play();

        bullet.game = game;
        bullet.fromSprite = fromSprite;
        bullet.toSprite = toSprite;
        bullet.update = this.update;

        return bullet;
    }

    update() {
        if (Phaser.Math.distance(this.x, this.y, this.fromSprite.x, this.fromSprite.y) > 50) {
            this.kill();
            this.destroy();
        }
    }

}



