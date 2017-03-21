import InputHandler from './InputHandler';

export default class BombHandler extends InputHandler {
    constructor(game, x, y) {
      super(game);
      var bombIcon = game.add.sprite(x, y, 'bomb_icon');
      bombIcon.scale.setTo(1, 1);
      bombIcon.inputEnabled = true;
      bombIcon.events.onInputDown.add(this.inputListener, this);
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
