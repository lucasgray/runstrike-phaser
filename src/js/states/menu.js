import Buttons from "../extensions/Buttons";

export default class Menu extends Phaser.State {

    create() {

        if (!this.game.backgroundMusic || !this.game.hasStartedMusic) {
            this.game.backgroundMusic = this.game.add.audio('backgroundMusic');
            this.game.backgroundMusic.play();
            this.game.hasStartedMusic = true;
        } else if (this.game.backgroundMusic && this.game.musicPause) {
            this.game.backgroundMusic.resume();
        }

        this.graphics = this.game.add.graphics(0, 0);

        let bkgrd = this.game.add.image(0, 0, 'retro-background');
        bkgrd.scale.setTo(.25, .5);

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 20,
            "WAR ROOM", {
            font: '60px Righteous',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        Buttons.makeButton(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + 125,
            this.game.width * 0.8,
            60,
            null,
            'Mission Select', ()=>{
                console.log("asking to start mission select!");
                this.state.start('Missions');
            }
        );

        // Buttons.makeButton(
        //     this.game,
        //     this.game.world.centerX,
        //     this.game.world.centerY+140,
        //     this.game.width * .8,
        //     60,
        //     this.btnDownSound,
        //     'debug data', ()=>{
        //         console.log("going to data!");
        //         this.state.start('Debug');
        //     }
        // );
    }
}
