

import Projectile from "./Projectile";
import GridDescriptor from "../../state/GridDescriptor";

export default class GreenBlob extends Projectile {

    defaultWidth: number = 32;
    defaultHeight: number = 32;
    range: number = 500;
    speed: number = 200;
    shootSound: string = 'shoot';

    constructor(game: Phaser.Game, fromSprite: Phaser.Sprite, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor) {
        super(game, fromSprite.x, fromSprite.y, fromSprite.angle, toSprite, 'green-projectile');

        super.paint(gridDescriptor);
    }

}
