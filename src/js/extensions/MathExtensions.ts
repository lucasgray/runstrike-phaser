
export default class MathExtensions {

    static calcRotationAngle(center: Phaser.Sprite, target: Phaser.Sprite, degrees = true) {
        let theta = Math.atan2(target.y - center.y, target.x - center.x);

        theta += Math.PI / 2.0;

        if (!degrees) return theta;

        let angle = Phaser.Math.radToDeg(theta);

        if (angle < 0) {
            angle += 360;
        }

        return angle;
    }

    static getRotationVectorForSprite(sprite: Phaser.Sprite, desiredRotation: number) {
        let rotation = 0;
        let turnNegative = -((Math.PI * 2) - (desiredRotation));
        let turnPositive = ((Math.PI * 2) - (desiredRotation));

        let diffDistance = Math.abs(sprite.rotation - turnNegative);

        // math.pi is the center
        if (diffDistance >= Math.PI) {
            rotation = (Math.PI * 2) - turnPositive;
        } else {
            rotation = turnNegative - sprite.rotation;
        }

        return rotation;
    }
}
