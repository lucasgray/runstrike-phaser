//http://www.quickanddirtytips.com/education/grammar/dialog-or-dialogue
import StoryObject from './StoryObject';

export default class Dialogue extends StoryObject {

    constructor(options) {
        super();
        this.options = options;

        this.showUntil = Date.now() + options.enemy.showFor;
        //buid caption box
        //image
        this.image = options.game.add.sprite(options.enemy.x, options.enemy.y, options.enemy.image);
        console.log(this instanceof StoryObject);
        //text
        this.image.update = this.update;
        return this.image;
    }

    update(){
      console.log('updating dialogue');
      if(this.alive){
        if(Date.now() >= this.showUntil){
          this.image.destroy();
          this.options.game.enemies.remove(this);
        }
      }
    }
}
