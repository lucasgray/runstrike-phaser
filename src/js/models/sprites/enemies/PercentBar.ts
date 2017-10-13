import 'phaser'
import SpriteExtensions from "../../../extensions/SpriteExtensions";

export default class PercentBar extends Phaser.Sprite {

    outerFrame: Phaser.Sprite;
    bg: Phaser.Sprite;
    bar: Phaser.Sprite;

    game: Phaser.Game;
    host: Phaser.Sprite;
    positioningHost: Phaser.Sprite;

    yOffsetScale: number;
    yOffset: number;
    positioning: number;

    constructor (game: Phaser.Game, host: Phaser.Sprite, positioningHost: Phaser.Sprite, yOffset: number, yOffsetScale: number, positioning: number) {
        super(game, positioningHost.x, positioningHost.y);

        this.host = host;
        this.positioningHost = positioningHost;
        this.yOffset = yOffset;
        this.yOffsetScale = yOffsetScale;
        this.positioning = positioning;

        // add 1x1 white pixel to cache if necessary
        if (!game.cache.checkImageKey('white1x1pixel')) {
            // loads 1x1 white gif from data URI
            game.load.image('white1x1pixel', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=');
            game.load.onLoadComplete.add(() => this.runCreation());
            game.load.start()
        } else {
            this.runCreation()
        }
    }

    runCreation() {

        this.width = this.positioningHost.width * ( 1 / this.positioningHost.scale.x) - 4;
        this.height = (this.positioningHost.height * ( 1 / this.positioningHost.scale.y)) / 16;

        this.outerFrame = this.game.make.sprite(0, 0, 'white1x1pixel');
        this.outerFrame.width = this.width + 2;
        this.outerFrame.height = this.height + 2;
        this.outerFrame.tint = Phaser.Color.hexToRGB('#03C1BF');
        this.positioningHost.addChild(this.outerFrame);
        SpriteExtensions.alignInParent(this.outerFrame, this.positioningHost, this.positioning, 1,
            1 + this.yOffset + (this.yOffset * this.yOffsetScale));

        this.bg = this.game.make.sprite(0, 0, 'white1x1pixel');
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bg.tint = Phaser.Color.hexToRGB('#005150');
        this.positioningHost.addChild(this.bg);
        SpriteExtensions.alignInParent(this.bg, this.positioningHost, this.positioning, 0,
            this.yOffset + (this.yOffset * this.yOffsetScale));

        this.bar = this.game.make.sprite(0, 0,'white1x1pixel');
        this.bar.width = this.width;
        this.bar.height = this.height;
        this.bar.tint = Phaser.Color.hexToRGB('#03C1BF');
        this.positioningHost.addChild(this.bar);
        SpriteExtensions.alignInParent(this.bar, this.positioningHost, this.positioning, 0,
            this.yOffset + (this.yOffset * this.yOffsetScale));
    }

    show(){
        this.setAlpha(1)
    }

    hide(){
        this.setAlpha(0)
    }

    setAlpha(newAlpha){
        this.bg.alpha = this.bar.alpha = this.outerFrame.alpha = newAlpha
    }

    update () {
        super.update();

        if (this.positioningHost && this.host && this.bg && this.bar) {
            // this.cropRect.width = this.bg.width * (this.host.health / (this.host.maxHealth));
            // this.bar.crop(this.cropRect, true);
            this.bar.width = this.bg.width * (this.host.health / (this.host.maxHealth));
        }
    }
}
