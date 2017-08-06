import * as Phaser from 'phaser-ce'

export default class PhysicsExtensions {
    static rotateToXY(sprite: Phaser.Sprite, x: number, y: number, offset: number){

        let targetAngle = (360 / (2 * Math.PI)) * Phaser.Math.angleBetween(sprite.x, sprite.y, x, y);

        if(targetAngle < 0)
            targetAngle += 360;

        sprite.angle = targetAngle + offset;
        return targetAngle + offset;
    };
}
