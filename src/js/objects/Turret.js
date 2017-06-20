import MapObject from './MapObject';
import _ from 'lodash';

export default class Turret extends MapObject {

    constructor(game, x, y, groups) {
        super();
        let defaultSize = {width: 32, height: 32};
        let scaleX = game.mission.gridSize.cellWidth / defaultSize.width;
        let scaleY = game.mission.gridSize.cellHeight / defaultSize.height;
        let base = game.add.sprite(x + ((defaultSize.width * scaleX) / 2), y + ((defaultSize.height * scaleY) / 2), 'turret');
        // g.anchor.y = -.1;
        base.inputEnabled = true;
        base.anchor.setTo(0.5);
        base.scale.setTo(scaleX, scaleY);

        base.game = game;
        base.lastShot = 0;
        base.bulletsGroup = base.game.add.physicsGroup();

        base.update = this.update;
        base.shootBulletFromTo = this.shootBulletFromTo;

        let shoot = game.add.audio('shoot');
        base.shoot = shoot;

        return base;
    }

    update(){
      if(this.lastCheck && Date.now() - this.lastCheck >= 20){
        let spriteDistances = this.game.enemies.hash.map((sprite) => {
            return {
                distance: Math.abs(sprite.x - this.x) + Math.abs(sprite.y - this.y),
                sprite: sprite
            };
        });

        let spritesInRange = spriteDistances.filter(s => s.sprite.alive);

        let rslt = _.minBy(spritesInRange, (s) => s.distance);

        if (rslt) {
            //TODO properly figure out where that sprite was going
            let fudge = 50;
            //stolen from https://gist.github.com/jnsdbr/7f349c6a8e7f32a63f21
            let angle = this.game.physics.arcade.rotateToXY(this, rslt.sprite.x, rslt.sprite.y+fudge, 90); //rotate with a 90 deg offset

            if (Date.now() - this.lastShot > 1000 && rslt.distance <= 300) {
              console.log('fire!' + rslt.distance);
                this.shootBulletFromTo(this, rslt.sprite, fudge, angle);
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

    shootBulletFromTo(from, to, fudge, rotation) {
        let bullet = this.game.add.sprite(from.x, from.y, 'bullet');
        bullet.anchor.setTo(0.5);
        bullet.angle = rotation;
        this.game.physics.arcade.enable(bullet);
        this.bulletsGroup.add(bullet);

        this.game.physics.arcade.moveToXY(bullet, to.x, to.y+fudge, 300);

        this.shoot.play();
    }
}
