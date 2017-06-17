export default class Buttons {

    static makeButton(game,x,y,width,height,btnDownSound,label,callback) {

        let graphics = game.add.graphics(x, y);
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.drawRect(
            x - (width/2),
            y - (height/2),
            width,
            height
        );

        let text = game.add.text(0, 0, label, {
            font: 'Joystix',
            fill: 'white',
            align: 'center',
            fontSize: height * 0.7
        });
        text.anchor.setTo(0.5);

        let sprite = graphics.game.add.sprite(x, y, graphics.generateTexture());
        graphics.destroy();

        sprite.addChild(text);
        sprite.anchor.setTo(0.5);

        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(() => {

            let tweenDown = game.add.tween(sprite.scale).to({ x: 0.8, y: 0.8}, 200, Phaser.Easing.Exponential.Out);
            let tweenUp = game.add.tween(sprite.scale).to({ x: 1, y: 1}, 200, Phaser.Easing.Exponential.Out);

            tweenDown.chain(tweenUp);
            tweenUp.onComplete.add(callback);

            tweenDown.start();

        }, sprite);
    }
}
