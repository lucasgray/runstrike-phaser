

import Projectile from "./Projectile";
import GridDescriptor from "../../state/GridDescriptor";

export default class SmallRocket extends Projectile {

    defaultWidth: number = 64;
    defaultHeight: number = 64;
    range: number = 500;
    speed: number = 200;
    shootSound: string = 'shoot';

    constructor(game: Phaser.Game, fromX: number, fromY: number, angle: number, toSprite: Phaser.Sprite, gridDescriptor: GridDescriptor) {
        super(game, fromX, fromY, angle, toSprite, 'blue-missile-projectile');

        super.paint(gridDescriptor);
    }

}
