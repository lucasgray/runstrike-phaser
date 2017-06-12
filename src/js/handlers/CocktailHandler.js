import InputHandler from './InputHandler';

export default class CocktailHandler extends InputHandler {
    constructor(game, x, y) {
        super(game);

        var graphics = game.add.graphics(x + 25,  y + 25);

        graphics.beginFill(0xffffff, 1);
        graphics.lineStyle(3, 0xF1235B);

        var whiteCircle = graphics.drawCircle(0, 0, 50);
        var itemCircle = graphics.drawCircle(20, 20, 25);

        // whiteCircle.addChild(itemCircle);
        // graphics.endFill();
        // graphics.lineStyle(2, 0xF1235B);
        // var circle = graphics.drawCircle(x + 40, y + 40, 25);

        var text = game.add.text(20, 20, this.num(), {
            font: '12px Joystix',
            fill: "#F1235B"
        });
        itemCircle.addChild(text);
        text.anchor.set(0.5);

        var cocktailIcon = game.add.sprite(x + 5, y, 'cocktail_icon');
        cocktailIcon.scale.setTo(.2, .2);
        cocktailIcon.inputEnabled = true;
        cocktailIcon.events.onInputDown.add(this.inputListener, cocktailIcon);

        cocktailIcon.inputListener = this.inputListener;
        cocktailIcon.action = this.action;
        cocktailIcon.text = text;
        cocktailIcon.num = this.num;
    }

    update() {
    }

    inputListener() {
        this.firstEvent = true;
        this.game.input.onTap.removeAll();
        if (this.game.activeInputHandler) {
            this.game.activeInputHandler.border.kill();
        }
        this.game.input.onTap.add(this.action, this);
    }

    action(pointer, doubleTap, sprite) {
        if (this.firstEvent) {
            this.firstEvent = false;
            this.game.activeInputHandler = this;
            this.border = this.game.add.graphics(0, 0);
            this.border.lineStyle(3, 0xFF69B4);
            this.border.beginFill(0xA4E1FD, 1);
            this.border.drawCircle(25, 25, 50);
            this.addChild(this.border);
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
