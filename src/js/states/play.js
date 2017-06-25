import Buttons from "../extensions/Buttons";
import * as inputHandlers from "../handlers";

export default class Play extends Phaser.State {

    preload() {
        this.graphics = this.game.add.graphics(0, 0);

        //Loop through the mission's sprite and preload them if they aren't already there
        this.game.mission.enemies.forEach((it) => {
          if(it.image){
            if(!this.game.cache.checkImageKey(it.image)){
              this.game.load.image(it.image, it.imageSrc, it.imageSize.x, it.imageSize.y);
            }
          }
        });
    }

    create() {
        this.game.mission.create();

        this.drawHealth();

        this.drawInput();

    }

    drawHealth() {
        //Draw rectangles for health of enemy army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(0, 0, 80, 1080);

        let w = this.game.world.width;
        let h = this.game.world.height;

        //Draw rectangles for health of player army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(w-80, 0, 80, 1080);
    }

    drawInput() {
        Object.keys(inputHandlers).forEach((ih,index) => {
            new inputHandlers[ih](this.game, 50, 300 + (90 * index));
        });

        this.btnDownSound = this.add.sound('menuDown');
        Buttons.makeButton(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            this.btnDownSound,
            'Back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Missions');
            }
        );
    }

    update() {
        this.game.mission.update();
        this.game.easystar.calculate();
    }

    shutdown() {
        console.log("shut down called");
        this.game.mission.shutdown();
    }
}
