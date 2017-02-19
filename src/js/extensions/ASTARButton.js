export default class ASTARButton extends Phaser.Button {

    constructor({ game, x, y, label}) {
        super(game, x, y);

        this.height = game.height * .1;
        this.width = game.width * .8;

        this.graphics = this.game.add.graphics(0, 0);
        this.graphics.lineStyle(2, 0xFF0000, 1);
        this.graphics.drawRect(
            x - (this.width/2),
            y - (this.height/2),
            this.width,
            this.height
        );

        this.title2 = new Phaser.Text(
            game,
            game.world.centerX,
            game.world.centerY-100,
            "Your hideout", {
                font: '50px Joystix',
                fill: 'white',
                align: 'center'
            });
        this.title2.anchor.setTo(0.5);

        this.addChild(this.title2);

    }
}
