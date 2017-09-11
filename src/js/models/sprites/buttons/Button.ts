import 'phaser';

export default class Button extends Phaser.Sprite {

    width: number;
    height: number;
    label: string;
    callback: Function;

    baseSprite: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, label: string, callback: Function) {
        super(game, x, y);

        this.width = width;
        this.height = height;
        this.label = label;
        this.callback = callback;

        this.paint();
    }

    paint() {

        //create graphics to make rectangle

        let graphics = this.game.add.graphics(this.x, this.y);
        graphics.lineStyle(2, 0xF1235B, 1);
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(
            this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width,
            this.height
        );

        let sprite = this.game.add.sprite(this.x, this.y, graphics.generateTexture());
        graphics.destroy();

        this.baseSprite = sprite;

        this.x = sprite.x;
        this.y = sprite.y;
        this.addChild(sprite);

        //text to go on button

        let text = this.game.add.text(0, 0, this.label, {
            font: 'Righteous',
            fill: 'white',
            align: 'center',
            fontSize: this.height * 0.7
        });

        text.anchor.setTo(0.5);

        sprite.addChild(text);
        sprite.anchor.setTo(0.5);

        //what to do on button click

        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(() => {

            let button = this.game.add.audio('button');
            button.play();

            let tween = this.doPressTween(sprite);
            tween.onComplete.add(this.callback);

        }, sprite);

        this.game.add.existing(sprite);
    }

    doPressTween(sprite: Phaser.Sprite) {
        let tweenDown = this.game.add.tween(sprite.scale).to({x: 0.8, y: 0.8}, 200, Phaser.Easing.Exponential.Out);
        let tweenUp = this.game.add.tween(sprite.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Exponential.Out);

        tweenDown.chain(tweenUp);

        tweenDown.start();

        return tweenUp;
    }


}
