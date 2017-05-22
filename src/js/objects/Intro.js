import StoryObject from './StoryObject';

export default class Intro extends StoryObject {

    constructor(options) {
        super();
        //buid caption box
        //image
        let g = options.game.add.graphics(0, 0);
        g.lineStyle(2, 0x002200, 0.5);
        g.beginFill(0x002200, 1);
        g.drawRect(0, 0, options.game.width, options.game.height); //no anchor, need to move it!
        g.endFill();
        g.inputEnabled = true;
        g.options = options;
        g.showUntil = Date.now() + options.enemy.showFor;

        //text
        g.messages = options.enemy.messages;
        g.messageIndex = 0;

        g.showLineFor = options.enemy.showFor / g.messages.length;

        let text = g.options.game.add.text(32, 380, g.messages[0], { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
        g.text = text;
        g.addChild(text);
        g.update = this.update;
        g.nextLine = this.nextLine;
        g.updateLine = this.updateLine;
        g.nextLine();
        return g;
    }

    update(){
      if(this.alive){
        if(Date.now() >= this.showUntil){
          this.destroy();
        }
      }
    }

    updateLine(){
      if(this.line.length < this.messages[this.messageIndex].length){
        this.line = this.messages[this.messageIndex].substr(0,this.line.length + 1);
        this.text.setText(this.line);
      } else {
        this.options.game.time.events.add(this.showLineFor / (this.messages[this.messageIndex].length + 1), this.nextLine, this);
      }
    }

    nextLine(){
      this.messageIndex++;
      if(this.messageIndex < this.messages.length){
        this.line = '';
        this.options.game.time.events.repeat(this.showLineFor / (this.messages[this.messageIndex].length + 1), this.messages[this.messageIndex].length + 1, this.updateLine, this);
      }
    }

}
