import Buttons from "../extensions/Buttons";
export default class Menu extends Phaser.State {

    create() {

        this.game.music = this.game.add.audio('futureMusic');
        this.graphics = this.game.add.graphics(0, 0);
        this.btnDownSound = this.add.sound('menuDown');

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Your hideout", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        Buttons.makeButton(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY,
            this.game.width * .8,
            60,
            this.btnDownSound,
            'setup defenses', ()=>{
                console.log("asking to setup");
                this.state.start('Setup');
            }
        );

        Buttons.makeButton(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY+70,
            this.game.width * .8,
            60,
            this.btnDownSound,
            'defend', ()=>{
                console.log("asking to start mission select!");
                this.state.start('Missions');
            }
        );
    }
}
