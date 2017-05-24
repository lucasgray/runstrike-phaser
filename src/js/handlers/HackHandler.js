import InputHandler from './InputHandler';

export default class HackHandler extends InputHandler {
    constructor(game, x, y) {
      super(game);
      var hackIcon = game.add.sprite(x, y, 'hack_icon');
      hackIcon.scale.setTo(1, 1);
      hackIcon.inputEnabled = true;
      hackIcon.events.onInputDown.add(this.inputListener, hackIcon);

      hackIcon.inputListener = this.inputListener;
      hackIcon.action = this.action;
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
        let hack = this.game.add.sprite(sprite.x, sprite.y, 'hack');
        hack.anchor.setTo(0.5, 0.5);
        hack.scale.setTo(0.6, 0.6);
        let hackAnimation = hack.animations.add('fly');
        hack.animations.play('fly', 30, false);
        hackAnimation.onComplete.add(() => {
            hack.destroy();
        });
      }
    }

}
