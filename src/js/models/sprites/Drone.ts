import Mission from "../../missions/Mission";

export default class Drone extends Phaser.Sprite {

    mission: Mission;
    randomVelocity: number;
    lastCalculation: number;
    explodeSound: () => Phaser.Sound;
    path: {x: number; y: number}[];
    lastMove: boolean = false;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, 0, 0, 'drone');

        //compensate for offset, then get the right cell, then place into center of cell
        this.x = mission.gridDescriptor.offsetX + (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = mission.gridDescriptor.offsetY + (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.mission = mission;

        let defaultSize = {width: 128, height: 128};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;

        this.animations.add('fly');
        this.animations.play('fly', 30, true);
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        this.randomVelocity = 50 + (Math.random() * 30);
        this.lastCalculation = 0;

        this.mission.easystar.findPath(row, col, Math.floor(this.mission.gridDescriptor.x / 2), (this.mission.gridDescriptor.y - 1), (path) => {
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

            let sound;
            if (Math.random() > .5) {
                sound = game.add.audio('crash-1');
            } else {
                sound = game.add.audio('crash-2');
            }

            return sound;
        };
    }

    update(){
        if (!this.lastMove && this.alive && this.path && this.path.length > 0) {
            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            var path = this.path;
            var first = path[0];
            var second = path[1];

            //second.col * this.game.mission.gridDescriptor.cellHeight to convert to cells
            if (this.y >= (second.y * this.mission.gridDescriptor.cellHeight)) {
                // console.log("we made it! altering path");

                path = path.slice(1);
                this.path = path;

                first = path[0];
                second = path[1];
            }

            //we want to move towards the CENTER of the next cell.. plus a little randomness
            let xToGo = (second.x * this.mission.gridDescriptor.cellWidth +  Math.floor(this.mission.gridDescriptor.cellWidth / 2)) ;
            let yToGo = (second.y * this.mission.gridDescriptor.cellHeight +  Math.floor(this.mission.gridDescriptor.cellHeight / 2));

            console.log(this.x + ' | ' + this.y);
            console.log(xToGo + ' | ' + yToGo);

            if (yToGo >= this.mission.gridDescriptor.height - this.mission.gridDescriptor.cellHeight) {
                this.lastMove = true;
            }

            // console.log("moving to " + xToGo + "," + yToGo)
            this.angle = Phaser.Math.radToDeg(this.game.physics.arcade.moveToXY(this, this.mission.gridDescriptor.offsetX + xToGo, yToGo, this.randomVelocity)) + 90;
        } else {
            // console.log('lastmoved.')
            if(this.alive && this.body){
              if(this.body.y > this.mission.gridDescriptor.height - (this.mission.gridDescriptor.cellHeight / 2)){
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
