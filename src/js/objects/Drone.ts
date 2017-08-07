import Mission from "../missions/Mission";
import * as EasyStar from "easystarjs";
import PhysicsExtensions from "../extensions/PhysicsExtensions";

export default class Drone extends Phaser.Sprite {

    mission: Mission;
    easystar: EasyStar.js;
    randomVelocity: number;
    lastCalculation: number;
    explodeSound: Function;
    path: {x: number; y: number}[];
    lastMove: boolean = false;

    constructor(game, x, y, groups) {
        super(game, x, y, 'drone');

        let defaultSize = {width: 128, height: 128};
        let scaleX = game.mission.gridSize.cellWidth / defaultSize.width;
        let scaleY = game.mission.gridSize.cellHeight / defaultSize.height;

        this.animations.add('fly');
        this.animations.play('fly', 30, true);
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        this.randomVelocity = 50 + (Math.random() * 30);
        this.lastCalculation = 0;
        if(groups){
          game.addToGroup(groups);
        }

        let curXCell = Math.floor(((this.x - this.mission.gridSize.offsetX) / this.mission.gridSize.width) * this.mission.gridSize.x) - 1;
        let curYCell = Math.floor((this.y / this.mission.gridSize.height) * this.mission.gridSize.y);

        this.easystar.findPath(curXCell, curYCell, Math.floor(this.mission.gridSize.x / 2), (this.mission.gridSize.y - 1), (path) => {
            if (!path) {
                console.log("The path to the destination point was not found.");
            } else {
                console.log("easystar success. ");
                path.forEach((p) => console.log(JSON.stringify(p)));
                this.path = path;
            }
            this.lastCalculation = Date.now();
        });

        this.explodeSound = () => {

            let sound = null;
            if (Math.random() > .5) {
                sound = game.add.audio('crash-1');
            } else {
                sound = game.add.audio('crash-2');
            }

            return sound;
        };
    }

    update(){
        if (!this.lastMove && this.alive && this.path) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            var path = this.path;
            var first = path[0];
            var second = path[1];

            //second.y * this.game.mission.gridSize.cellHeight to convert to cells
            if (this.y >= (second.y * this.mission.gridSize.cellHeight)) {
                // console.log("we made it! altering path");

                path = path.slice(1);
                this.path = path;

                first = path[0];
                second = path[1];
            }

            //we want to move towards the CENTER of the next cell.. plus a little randomness
            let xToGo = (second.x * this.mission.gridSize.cellWidth +  Math.floor(this.mission.gridSize.cellWidth / 2)) ;
            let yToGo = (second.y * this.mission.gridSize.cellHeight +  Math.floor(this.mission.gridSize.cellHeight / 2));

            console.log(this.x + ' | ' + this.y);
            console.log(xToGo + ' | ' + yToGo);

            let velocity = this.randomVelocity;

            if (yToGo >= this.mission.gridSize.height - this.mission.gridSize.cellHeight) {
                this.lastMove = true;
            }

            // console.log("moving to " + xToGo + "," + yToGo)
            this.game.physics.arcade.moveToXY(this, this.mission.gridSize.offsetX + xToGo, yToGo, velocity);
            PhysicsExtensions.rotateToXY(this, this.mission.gridSize.offsetX + xToGo, yToGo, 90); //rotate with a 90 deg offset
        } else {
            // console.log('lastmoved.')
            if(this.alive){
              if(this.body.y > this.mission.gridSize.height - (this.mission.gridSize.cellHeight / 2)){
                this.game.state.start('Defeat');
              }
            }
        }
    }

    shot(){
        this.alive = false;

        this.explodeSound().play();

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
