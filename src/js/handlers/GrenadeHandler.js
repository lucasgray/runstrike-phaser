import InputHandler from './InputHandler';

export default class GrenadeHandler extends InputHandler {
    constructor(game, x, y) {
        super(game);

        var graphics = game.add.graphics(x + 25, y + 25);

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

        var grenadeIcon = game.add.sprite(x + 12, y + 7, 'grenade_icon');
        grenadeIcon.scale.setTo(.2, .2);
        grenadeIcon.inputEnabled = true;
        grenadeIcon.events.onInputDown.add(this.inputListener, grenadeIcon);

        grenadeIcon.inputListener = this.inputListener;
        grenadeIcon.action = this.action;
        grenadeIcon.text = text;
        grenadeIcon.num = this.num;
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
        if (sprite && sprite.alive) {
            sprite.shot();
            let hack = this.game.add.sprite(sprite.x, sprite.y, 'hack');
            hack.anchor.setTo(0.5, 0.5);
            hack.scale.setTo(0.6, 0.6);
            let hackAnimation = hack.animations.add('fly');
            hack.animations.play('fly', 30, false);
            hackAnimation.onComplete.add(() => {
                hack.destroy();
            });

            this.game.dao.useItem("Grenade");
            this.text.setText(this.num());
        }
    }

    num() {
        let grenades = this.game.gameData.inventoryItems.find(it => it.type === 'grenade');

        if (grenades) {
            return grenades.amount + "";
        } else {
            return "0";
        }
    }

}
