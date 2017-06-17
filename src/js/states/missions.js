import Buttons from "../extensions/Buttons";
import * as missions from "../missions";

export default class Menu extends Phaser.State {

    create() {

        this.game.music = this.game.add.audio('futureMusic');
        this.graphics = this.game.add.graphics(0, 0);
        this.btnDownSound = this.add.sound('menuDown');

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Select Mission", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        Object.keys(missions).forEach((mission, index) => {
          Buttons.makeButton(
              this.game,
              this.game.world.centerX,
              this.game.world.centerY + (70 * index),
              this.game.width * 0.8,
              60,
              this.btnDownSound,
              mission, ()=>{
                  console.log("asking to play a mission!");
                  this.game.mission = new missions[mission](this.game);
                  this.state.start('Setup');
              }
          );
        });

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
