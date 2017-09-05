import Mission from "../../../missions/Mission";
import HealthBar from 'phaser-percent-bar';
import * as _ from 'lodash';

export abstract class Enemy extends Phaser.Sprite {

    mission: Mission;

    abstract defaultWidth : number;
    abstract defaultHeight: number;
    abstract animationFrameRate: number;
    abstract rotatingSprite: boolean;

    randomVelocity: number;

    targetable: boolean;

    healthBar: HealthBar;
    explodeSound: () => Phaser.Sound;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number, texture: string, speed: number) {
        super(game, 0, 0, texture);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.mission = mission;

        this.randomVelocity =  speed + (Math.random() * 30);
        this.targetable = true;

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

    paint(mission: Mission, row: number, col: number) {
        //compensate for offset, then get the right cell, then place into center of cell
        this.x = mission.gridDescriptor.offsetX + (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = mission.gridDescriptor.offsetY + (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        let defaultSize = {width: this.defaultWidth, height: this.defaultHeight};
        let scaleX = this.mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = this.mission.gridDescriptor.cellHeight / defaultSize.height;

        this.animations.add('fly');
        this.animations.play('fly', this.animationFrameRate, true);
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        if (this.rotatingSprite) {
            // default to immediately south
            this.angle = 180;
        }
    }

    addHealthbar(mission: Mission, health: number) {
        this.health = health;
        this.maxHealth = health;
        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new HealthBar({
            game: this.game,
            host: this,
            height: 2,
            xOffset: - (this.width / 2),
            yOffset: - (mission.gridDescriptor.cellHeight / 2)
        }));
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
        this.alive = false;

        return this;
    }
}

export abstract class PathfindingEnemy extends Enemy {

    lastCalculation: number;
    path: {x: number; y: number, seen: boolean}[];

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number, texture: string, speed: number) {
        super(game, mission, row, col, texture, speed);

        this.lastCalculation = 0;
    }

    pathfind(mission: Mission, row: number, col: number) {
        this.mission.easystar.findPath(row, col, Math.floor(mission.gridDescriptor.x / 2), (mission.gridDescriptor.y - 1), (path) => {
            if (!path) {
                console.log("The path to the destination point was not found.");
            } else {
                console.log("easystar success. ");
                path.forEach((p) => console.log(JSON.stringify(p)));
                this.path = path.map(i => { return {...i, seen: false}});
            }
            this.lastCalculation = Date.now();
        });
    }

    update() {
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

                        if (this.rotatingSprite) {
                            let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
                            this.game.add.tween(this).to({angle: this.angle + b}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                        }
                    }
                }
            }
        }
    }
}

export abstract class FlyingEnemy extends Enemy {

    rotatingSprite: boolean = true;

    constructor(game: Phaser.Game, mission: Mission, row: number, col: number, texture: string, speed: number) {
        super(game, mission, row, col, texture, speed);
    }

    flyTowardsBase() {

        let xToGo = ((this.mission.gridDescriptor.x / 2) * this.mission.gridDescriptor.cellWidth)
            + (this.mission.gridDescriptor.cellWidth / 2);
        let yToGo = ((this.mission.gridDescriptor.y - 1) * this.mission.gridDescriptor.cellHeight)
            + (this.mission.gridDescriptor.cellHeight / 2);

        let a = this.game.physics.arcade.moveToXY(this, xToGo, yToGo, this.randomVelocity);

        let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
        this.game.add.tween(this).to({angle: this.angle + b}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

}
