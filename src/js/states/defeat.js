import Buttons from "../extensions/Buttons";

export default class Defeat extends Phaser.State {

    create() {

        this.game.backgroundMusic.pause();
        this.game.musicPause = true;

        let lose = this.game.add.audio('lose');
        lose.play();

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
            null,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
