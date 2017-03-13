import InputHandler from './InputHandler';

export default class HackHandler extends InputHandler {
    constructor(game, x, y) {
      super(game);
      var hackIcon = game.add.sprite(x, y, 'hack_icon');
      hackIcon.scale.setTo(1, 1);
      hackIcon.inputEnabled = true;
      hackIcon.events.onInputDown.add(this.inputListener, this);
    }

    update(){
    }

    inputListener(){
      this.firstEvent = true;
      this.game.input.onTap.removeAll();
      this.game.input.onTap.add(this.action, this);
    }

    action(pointer, doubleTap, sprite){
      if(this.firstEvent){
        this.firstEvent = false;
        return;
      }
      if(sprite && sprite.alive){
        sprite.shot();
      }
    }

}
