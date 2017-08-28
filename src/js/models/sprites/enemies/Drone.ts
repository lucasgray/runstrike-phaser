import Mission from "../../../missions/Mission";
import HealthBar from 'phaser-percent-bar';
import * as _ from 'lodash';

export default class Drone extends Phaser.Sprite {

    mission: Mission;
    randomVelocity: number;
    lastCalculation: number;
    explodeSound: () => Phaser.Sound;
    path: {x: number; y: number, seen: boolean}[];
    healthBar: HealthBar;
    targetable: boolean;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number) {
        super(game, 0, 0, 'drone');

        //compensate for offset, then get the right cell, then place into center of cell
        this.x = mission.gridDescriptor.offsetX + (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = mission.gridDescriptor.offsetY + (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.mission = mission;

        let defaultSize = {width: 32, height: 32};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;

        this.animations.add('fly');
        this.animations.play('fly', 30, true);
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        this.randomVelocity = 50 + (Math.random() * 30);
        this.lastCalculation = 0;
        this.targetable = true;

        this.mission.easystar.findPath(row, col, Math.floor(this.mission.gridDescriptor.x / 2), (this.mission.gridDescriptor.y - 1), (path) => {
            if (!path) {
                console.log("The path to the destination point was not found.");
            } else {
                console.log("easystar success. ");
                path.forEach((p) => console.log(JSON.stringify(p)));
                this.path = path.map(i => { return {...i, seen: false}});
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

        this.health = 10000;
        this.maxHealth = 10000;

        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new HealthBar({
            game: this.game,
            host: this,
            height: 4,
            xOffset: - (this.width / 2)
        }));
    }

    update(){
        if (this.alive && this.targetable && this.path && this.path.length > 0 && _.some(this.path, _ => !_.seen)) {

            //if we're in the process of moving from loc a to b, keep going
            //otherwise prep the next step

            let cur = this.path.filter(_ => !_.seen)[0];
            let next = cur;

            if (cur) {

                //we want to move towards the CENTER of the next cell..
                let xToGo = this.mission.gridDescriptor.offsetX + (cur.x * this.mission.gridDescriptor.cellWidth +  Math.floor(this.mission.gridDescriptor.cellWidth / 2)) ;
                let yToGo = (cur.y * this.mission.gridDescriptor.cellHeight +  Math.floor(this.mission.gridDescriptor.cellHeight / 2));

                //have we made it yet, or are we going for the first time?
                if (_.every(this.path, _ => !_.seen) || (Math.abs(xToGo - this.x) < 10 && Math.abs(yToGo - this.y) < 10)) {
                    console.log('got to next!');
                    cur.seen = true;
                    next = this.path.filter(_ => !_.seen)[0];

                    if (next) {
                        xToGo = this.mission.gridDescriptor.offsetX + (next.x * this.mission.gridDescriptor.cellWidth +  Math.floor(this.mission.gridDescriptor.cellWidth / 2)) ;
                        yToGo = (next.y * this.mission.gridDescriptor.cellHeight +  Math.floor(this.mission.gridDescriptor.cellHeight / 2));

                        let a = this.game.physics.arcade.moveToXY(this, xToGo, yToGo, this.randomVelocity);
                        let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
                        this.game.add.tween(this).to({angle: this.angle + b }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                    }
                }
            }
        }
    }

    shot() {
        this.damage(20);
    }

    massivelyDamage() {
        this.damage(50);
    }

    kill() {
        this.healthBar.hide();
        this.explodeSound().play();
        this.targetable = false;

        this.game.add.tween(this).to({angle: 359}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
        let fallTween = this.game.add.tween(this.scale).to({x: 0, y: 0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);

        fallTween.onComplete.add(() => {
            this.alive = false;

            let explosion = this.game.add.sprite(this.x, this.y, 'explosion');
            explosion.anchor.setTo(0.2, 0.2);
            explosion.scale.setTo(0.2, 0.2);
            let explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);
            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
            });
        });

        return this;
    }
}
