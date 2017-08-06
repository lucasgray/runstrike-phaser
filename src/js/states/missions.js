import Button from "../prefabs/Button";
import * as missions from "../missions";

export default class Menu extends Phaser.State {

    create() {

        this.graphics = this.game.add.graphics(0, 0);

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Select Mission", {
            font: '60px Righteous',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        Object.keys(missions).forEach((mission, index) => {
          new Button(
              this.game,
              this.game.world.centerX,
              this.game.world.centerY + (70 * index),
              this.game.width * 0.8,
              60,
              mission, ()=>{
                  console.log("asking to play a mission!");
                  this.game.mission = new missions[mission](this.game);
                  this.state.start('Setup');
              }
          );
        });

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
