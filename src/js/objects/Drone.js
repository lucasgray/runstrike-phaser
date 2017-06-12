import EnemyObject from './EnemyObject';

export default class Turret extends EnemyObject {

    constructor(game, x, y, groups) {
        super();
        let defaultSize = {width: 128, height: 128};
        let scaleX = game.mission.gridSize.cellWidth / defaultSize.width;
        let scaleY = game.mission.gridSize.cellHeight / defaultSize.height;
        let sprite = game.add.sprite(x + game.mission.gridSize.offsetX, y, 'drone');
        sprite.animations.add('fly');
        sprite.animations.play('fly', 30, true);
        sprite.scale.setTo(scaleX, scaleY);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.inputEnabled = true;
        //TODO: Fix events
        sprite.game = game;
        sprite.events.onInputDown.add((sprite, pointer) => {
          sprite.game.input.onTap.dispatch(pointer, false, sprite);
        }, sprite);
        sprite.randomVelocity = 50 + (Math.random() * 30);
        sprite.shot = this.shot;
        sprite.lastCalculation = 0;
        if(groups){
          this.addToGroup(groups);
        }

        let curXCell = Math.floor(((sprite.x - sprite.game.mission.gridSize.offsetX) / sprite.game.mission.gridSize.width) * sprite.game.mission.gridSize.x) - 1;
        let curYCell = Math.floor((sprite.y / sprite.game.mission.gridSize.height) * sprite.game.mission.gridSize.y);

        sprite.game.easystar.findPath(curXCell, curYCell, Math.floor(sprite.game.mission.gridSize.x / 2), (sprite.game.mission.gridSize.y - 1), (path) => {
            if (!path) {
                console.log("The path to the destination point was not found.");
            } else {
                console.log("easystar success. ");
                path.forEach((p) => console.log(JSON.stringify(p)));
                sprite.path = path;
            }
            sprite.lastCalculation = Date.now();
        });
        sprite.update = this.update;

        return sprite;
    }

    update(){
        if (!this.lastMove && this.alive && this.path) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            var path = this.path;
            var first = path[0];
            var second = path[1];

            //second.y * sprite.game.mission.gridSize.cellHeight to convert to cells
            if (this.y >= (second.y * this.game.mission.gridSize.cellHeight)) {
                // console.log("we made it! altering path");

                path = path.slice(1);
                this.path = path;

                first = path[0];
                second = path[1];
            }

            //we want to move towards the CENTER of the next cell.. plus a little randomness
            let xToGo = (second.x * this.game.mission.gridSize.cellWidth +  Math.floor(this.game.mission.gridSize.cellWidth / 2)) ;
            let yToGo = (second.y * this.game.mission.gridSize.cellHeight +  Math.floor(this.game.mission.gridSize.cellHeight / 2));

            console.log(this.x + ' | ' + this.y);
            console.log(xToGo + ' | ' + yToGo);

            let velocity = this.randomVelocity;

            if (yToGo >= this.game.mission.gridSize.height - this.game.mission.gridSize.cellHeight) {
                this.lastMove = true;
            }

            // console.log("moving to " + xToGo + "," + yToGo)
            this.game.physics.arcade.moveToXY(this, this.game.mission.gridSize.offsetX + xToGo, yToGo, velocity);
            this.game.physics.arcade.rotateToXY(this, this.game.mission.gridSize.offsetX + xToGo, yToGo, 90); //rotate with a 90 deg offset
        } else {
            // console.log('lastmoved.')
            if(this.alive){
              if(this.body.y > this.game.mission.gridSize.height - (this.game.mission.gridSize.cellHeight / 2)){
                this.game.state.start('Defeat');
              }
            }
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
            explosion.anchor.setTo(0.2, 0.2);
            explosion.scale.setTo(0.2, 0.2);
            let explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);
            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
                this.destroy();
            });
        });
    }
}
