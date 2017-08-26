

import Projectile from "./Projectile";

export default class GreenBlob extends Projectile {

    range: number = 500;
    speed: number = 200;
    shootSound: string = 'shoot';

    constructor(game: Phaser.Game, fromSprite: Phaser.Sprite, toSprite: Phaser.Sprite) {
        super(game, fromSprite, toSprite, 'green-projectile');

        super.paint();
    }

}