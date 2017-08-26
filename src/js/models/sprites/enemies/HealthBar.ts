import Mission from "../../../missions/Mission";
import SpriteExtensions from "../../../extensions/SpriteExtensions";

export default class HealthBar extends Phaser.Sprite {

    backgroundSprite: Phaser.Sprite;
    foregroundSprite: Phaser.Sprite;

    sprite: Phaser.Sprite;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, 0, 0, '');

        SpriteExtensions.alignInParent(this, sprite, Phaser.BOTTOM_CENTER);

        this.width = sprite.width;
        this.height = 10;

        this.backgroundSprite = this.drawBackground();
        this.foregroundSprite = this.drawForeground();
        this.sprite = sprite;
    }

    drawBackground(): Phaser.Sprite {
        let bmd = this.game.add.bitmapData(this.width, this.height);
        bmd.ctx.fillStyle = '#b5283f';
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.width, this.height);
        bmd.ctx.fill();
        bmd.update();

        let sprite = new Phaser.Sprite(this.game, this.x, this.y, bmd);
        sprite.anchor.set(0.5);
        this.game.add.existing(sprite);

        return sprite;
    };

    drawForeground() {
        let bmd = this.game.add.bitmapData(this.width, this.height);
        bmd.ctx.fillStyle = '#38ff63';
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.width, this.height);
        bmd.ctx.fill();
        bmd.update();

        let sprite = new Phaser.Sprite(this.game, this.x, this.y, bmd);
        sprite.anchor.set(0.5);
        this.game.add.existing(sprite);

        return sprite;

    }

    update() {
        super.update();

        if (this.sprite.health <= 0 ) {
            this.destroy();
            this.backgroundSprite.destroy();
            this.foregroundSprite.destroy();
        }

        const width = this.backgroundSprite.width * ( this.sprite.health / this.sprite.maxHealth);

        this.foregroundSprite.width = width;
    }


}
