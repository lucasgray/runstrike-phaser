import MapObject from './MapObject';

export default class Turret extends MapObject {

    constructor(game, x, y, groups) {
        super();
        let sprite = game.add.sprite(x, y, 'drone');
        sprite.animations.add('fly');
        sprite.animations.play('fly', 30, true);
        sprite.scale.setTo(.25, .25);
        sprite.anchor.setTo(.5, .5);
        sprite.inputEnabled = true;
        //TODO: Fix events
        sprite.events.onInputDown.add(() => {
            if (this.inputMode === 'hack') {
                this.shot(sprite);
            }
        }, this);
        sprite.randomVelocity = 50 + (Math.random() * 30);
        sprite.shot = this.shot;
        this.sprite = sprite;
        this.game = game;
        this.lastCalculation = 0;
        if(groups){
          this.addToGroup(groups);
        }
        return sprite;
    }

    update(){
        if (!this.sprite.lastMove && this.sprite.alive && this.sprite.path) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            var path = this.sprite.path;
            var first = path[0];
            var second = path[1];

            //negative is left, positive is right.
            var xDirection = second.x - first.x;

            //second.y * 64 to convert to cells
            if (this.sprite.body.y >= (second.y * 64)) {
                // console.log("we made it! altering path");

                path = path.slice(1);
                this.sprite.path = path;

                first = path[0];
                second = path[1];
            }

            //we want to move towards the CENTER of the next cell.. plus a little randomness
            let xToGo = (second.x * 64 + 32) ;//+ (Math.random() * 20);
            let yToGo = (second.y * 64 + 32) ;//+ (Math.random() * 20);


            let velocity = this.randomVelocity;

            if (yToGo >= this.game.height - 64) {
                this.sprite.lastMove = true;
                console.log("last move. moving to " + xToGo + "," + this.game.height)
                //this.sprite.game.physics.arcade.moveToXY(this.sprite, xToGo, this.sprite.game.height, velocity);
            }

            // console.log("moving to " + xToGo + "," + yToGo)
            this.game.physics.arcade.moveToXY(this.sprite, xToGo, yToGo, velocity);
        } else {
            // console.log('lastmoved.')
        }

        if(Date.now() - this.lastCalculation > 500){

            let curXCell = Math.floor((this.sprite.x / 640) * 10);
            let curYCell = Math.floor((this.sprite.y / 960) * 15);

            console.log(curXCell + ' | ' + curYCell);

            if(curYCell > 14){
              console.log('out of bounds!');
            } else {
              //640x960 find path to bottom left of the screen
              this.game.easystar.findPath(curXCell, curYCell, 5, 14, (path) => {
                  if (path === null) {
                       //console.log("The path to the destination point was not found.");
                  } else {
                      // console.log("easystar success. ");
                      path.forEach((p) => console.log(JSON.stringify(p)));
                      this.sprite.path = path;
                  }
              });
            }
            this.lastCalculation = Date.now();
        }
    }

    shot(){
        this.alive = false;
        this.game.add.tween(this).to({angle: 360}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        var fall = this.game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        fall.onComplete.add(() => {
            let explosion = this.game.add.sprite(this.x, this.y, 'explosion');
            explosion.anchor.setTo(.2, .2);
            explosion.scale.setTo(.2, .2);
            let explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);
            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
                this.destroy();
            })
        });
    }
}
