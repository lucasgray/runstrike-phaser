import Buttons from "../extensions/Buttons";

export default class Defeat extends Phaser.State {

    create() {

        this.game.music = this.game.add.audio('futureMusic');
        this.graphics = this.game.add.graphics(0, 0);
        this.btnDownSound = this.add.sound('menuDown');

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Defeat!", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

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
