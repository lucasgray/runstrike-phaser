import Buttons from "../extensions/Buttons";

export default class Victory extends Phaser.State {

    create() {

        this.game.backgroundMusic.pause();
        this.game.musicPause = true;

        let win = this.game.add.audio('win');
        win.play();

        let title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Victory!", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);

        Buttons.makeButton(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            null,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
