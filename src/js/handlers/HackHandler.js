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
      if(this.game.activeInputHandler){
        this.game.activeInputHandler.border.kill();
      }
      this.game.input.onTap.add(this.action, this);
    }

    action(pointer, doubleTap, sprite){
      if(this.firstEvent){
        this.firstEvent = false;
        this.game.activeInputHandler = this;
        this.border = this.game.add.graphics(0, 0);
        this.border.lineStyle(3, 0xFF69B4, 1);
        this.border.drawRect(0, 0, this.texture.width, this.texture.height);
        this.addChild(this.border);
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
