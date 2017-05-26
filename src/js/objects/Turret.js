import MapObject from './MapObject';
import _ from 'lodash';

export default class Turret extends MapObject {

    constructor(game, x, y, groups) {
        super();
        let base = game.add.sprite(x+35, y+33, 'turret-bottom');
        // g.anchor.y = -.1;
        base.inputEnabled = true;
        base.anchor.setTo(0.5);

        let gun = game.add.sprite(0, -15, 'turret-top');
        gun.anchor.setTo(0.5);
        gun.inputEnabled = true;
        base.addChild(gun);
        base.gun = gun;

        base.game = game;
        base.lastShot = 0;
        base.bulletsGroup = base.game.add.physicsGroup();

        base.update = this.update;
        base.shootBulletFromTo = this.shootBulletFromTo;

        return base;
    }

    update(){
      let center = {x: this.x - 2, y: this.y - 1};
      if(this.lastCheck && Date.now() - this.lastCheck >= 20){
        let spriteDistances = this.game.enemies.hash.map((sprite) => {
            return {
                distance: Math.abs(sprite.x - center.x) + Math.abs(sprite.y - center.y),
                sprite: sprite
            };
        });

        let spritesInRange = spriteDistances.filter(s => s.sprite.alive);

        let rslt = _.minBy(spritesInRange, (s) => s.distance);

        if (rslt) {
            //TODO properly figure out where that sprite was going
            let fudge = 50;
            //stolen from https://gist.github.com/jnsdbr/7f349c6a8e7f32a63f21
            this.game.physics.arcade.rotateToXY(this, rslt.sprite.x, rslt.sprite.y+fudge, 90); //rotate with a 90 deg offset

            if (Date.now() - this.lastShot > 1000 && rslt.distance <= 300) {
              console.log('fire!' + rslt.distance);
                this.shootBulletFromTo(center.x, center.y, rslt.sprite, fudge);
                this.lastShot = Date.now();
            } else {
              console.log('dont fire!' + rslt.distance);
            }
        }
      }
      this.lastCheck = Date.now();

      this.game.physics.arcade.overlap(this.bulletsGroup, this.game.enemies, (bullet, sprite) => {
          if(sprite.alive){
            sprite.shot();
          }
          bullet.kill();
      }, null, this);
    }

    shootBulletFromTo(x, y, sprite, fudge) {
        let bullet = this.game.add.sprite(x, y, 'bullet');
        this.game.physics.arcade.enable(bullet);
        this.bulletsGroup.add(bullet);

        this.game.physics.arcade.moveToXY(bullet, sprite.x, sprite.y+fudge, 300);
    }
}
