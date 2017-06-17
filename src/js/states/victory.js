import Buttons from "../extensions/Buttons";

export default class Victory extends Phaser.State {

    create() {

        this.game.music = this.game.add.audio('futureMusic');
        this.graphics = this.game.add.graphics(0, 0);
        this.btnDownSound = this.add.sound('menuDown');

        let title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Victory!", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);

        let tweenDown = this.game.add.tween(title.scale).to({ x: 0.4, y: 0.8}, 200, Phaser.Easing.Exponential.Out);

        Buttons.makeButton(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            this.btnDownSound,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
