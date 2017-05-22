//http://www.quickanddirtytips.com/education/grammar/dialog-or-dialogue
import StoryObject from './StoryObject';

export default class Dialogue extends StoryObject {

    constructor(options) {
        super();
        //buid caption box
        //image
        let image = options.game.add.sprite(options.enemy.x, options.enemy.y, options.enemy.image);
        image.options = options;
        image.showUntil = Date.now() + options.enemy.showFor;
        //text
        image.update = this.update;
        return image;
    }

    update(){
      if(this.alive){
        if(Date.now() >= this.showUntil){
          this.destroy();
          this.options.game.enemies.remove(this);
        }
      }
    }
}
