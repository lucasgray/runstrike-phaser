
import GridDescriptor from "../models/state/GridDescriptor";

export default class TurretSetupPanel {

    topLeft: Phaser.Point;
    sprite: Phaser.Sprite;

    game: Phaser.Game;

    accentColor: string = "#03C1BF";

    width: number ;
    height: number;

    constructor(game: Phaser.Game, topLeft: Phaser.Point, gridDescriptor: GridDescriptor) {

        this.game = game;
        this.topLeft = topLeft;
        this.sprite = game.add.sprite(topLeft.x, topLeft.y);
        this.width = gridDescriptor.cellWidth * 2;
        this.height = gridDescriptor.cellHeight * 4;

        this.paint();
    }

    paint() {
        let graphics = this.game.add.graphics(this.topLeft.x, this.topLeft.y);
        graphics.beginFill(0x000000, .6);
        graphics.lineStyle(2, Phaser.Color.hexToRGB(this.accentColor));
        graphics.drawRect(0, 0, this.width, this.height);

        let parentSprite = this.game.add.sprite(this.topLeft.x, this.topLeft.y, graphics.generateTexture());
        graphics.destroy();
    }

    destroy() {
        this.sprite.destroy();
    }

}
