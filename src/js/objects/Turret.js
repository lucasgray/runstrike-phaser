import MapObject from './MapObject';
import _ from 'lodash';

export default class Turret extends MapObject {

    constructor(game, x, y, groups) {
        super();
        let g = game.add.sprite(x+35, y+33, 'turret-bottom');
        // g.anchor.y = -.1;
        g.inputEnabled = true;
        g.anchor.setTo(0.5);

        let h = game.add.sprite(0, -15, 'turret-top');
        h.anchor.setTo(0.5);
        h.inputEnabled = true;
        g.addChild(h);

        this.base = g;
        this.gun = h;
        this.game = game;
        this.lastShot = 0;
        this.bulletsGroup = this.game.add.physicsGroup();
        this.addToGroup(groups);

        return this;
    }

    update(){
      console.log(this.lastCheck);
      let center = {x: this.base.x - 2, y: this.base.y - 1};
      if(this.lastCheck && Date.now() - this.lastCheck >= 20){
        console.log('now!');
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
            let targetAngle = (360 / (2 * Math.PI)) * this.game.math.angleBetween(this.base.x, this.base.y, rslt.sprite.x, rslt.sprite.y+fudge);

            if(targetAngle < 0)
                targetAngle += 360;

            //then i think it needs 90 degrees since its left/right instead of top/down
            this.base.angle = targetAngle + 90;

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
