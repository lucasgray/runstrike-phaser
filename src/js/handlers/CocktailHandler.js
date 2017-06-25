import InputHandler from './InputHandler';

export default class CocktailHandler extends InputHandler {
    constructor(game, x, y) {
        super(game);

        var graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 60);

        var parentSprite = game.add.sprite(x, y, graphics.generateTexture());
        parentSprite.anchor.set(.5);
        graphics.destroy();

        var cocktailIcon = game.add.sprite(0, 0, 'cocktail_icon');
        cocktailIcon.anchor.set(0.5);
        cocktailIcon.scale.setTo(.25, .25);

        parentSprite.addChild(cocktailIcon);

        graphics = game.add.graphics(x, y);
        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);
        graphics.drawCircle(0, 0, 25);

        var itemSprite = game.add.sprite(0, 0, graphics.generateTexture());
        graphics.destroy();
        itemSprite.anchor.set(.5);
        parentSprite.addChild(itemSprite);
        itemSprite.alignInParent(Phaser.BOTTOM_RIGHT);

        var text = game.add.text(0, 0, this.num(), {
            font: '12px Joystix',
            fill: "#F1235B",
            align: "center"
        });
        text.anchor.set(.5);
        itemSprite.addChild(text);

        parentSprite.inputEnabled = true;
        parentSprite.events.onInputDown.add(this.inputListener, parentSprite);

        parentSprite.inputListener = this.inputListener;
        parentSprite.action = this.action;
        parentSprite.text = text;
        parentSprite.num = this.num;
    }

    update() {
    }

    inputListener() {
        this.firstEvent = true;
        this.game.input.onTap.removeAll();
        if (this.game.activeInputHandler) {
            this.game.add.tween(this.game.activeInputHandler.scale)
                .to({ x: 1.0, y: 1.0}, 200, Phaser.Easing.Exponential.In).start();
        }
        this.game.input.onTap.add(this.action, this);
        this.game.add.tween(this.scale).to({ x: 1.4, y: 1.4}, 600, Phaser.Easing.Bounce.Out).start();
        this.game.activeInputHandler = this;

        let button = this.game.add.audio('button');
        button.play();
    }

    action(pointer, doubleTap) {
        if (this.firstEvent) {
            this.firstEvent = false;
            this.game.activeInputHandler = this;
            return;
        }
        let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);
        let explosionAnimation = explosion.animations.add('fly');
        explosion.animations.play('fly', 30, false);

        this.game.enemies.forEachAlive((sprite) => {
            let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

            //FIXME
            //for now we just kills em
            if (dist <= 50) {
                sprite.shot();
            }
        });

        explosionAnimation.onComplete.add(() => {
            explosion.destroy();
        });

        this.game.dao.useItem("Cocktail");
        this.text.setText(this.num());
    }

    num() {

        let cocktails = this.game.gameData.inventoryItems.find(it => it.type === 'cocktail');

        if (cocktails) {
            return cocktails.amount + "";
        } else {
            return "0";
        }
    }

}
