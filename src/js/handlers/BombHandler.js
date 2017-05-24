import InputHandler from './InputHandler';

export default class BombHandler extends InputHandler {
    constructor(game, x, y) {
      super(game);
      var bombIcon = game.add.sprite(x, y, 'bomb_icon');
      bombIcon.scale.setTo(1, 1);
      bombIcon.inputEnabled = true;
      bombIcon.events.onInputDown.add(this.inputListener, bombIcon);

      bombIcon.inputListener = this.inputListener;
      bombIcon.action = this.action;
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
      let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
      explosion.anchor.setTo(0.5, 0.5);
      let explosionAnimation = explosion.animations.add('fly');
      explosion.animations.play('fly', 30, false);

      this.game.enemies.forEachAlive((sprite) => {
          let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

          //FIXME
          //for now we just kills em
          if (dist <= 50) {
              sprite.shot();
          }
      });

      explosionAnimation.onComplete.add(() => {
          explosion.destroy();
      });
    }

}
