import Mission from "../../../missions/Mission";
import * as _ from 'lodash';
import PercentBar from "./PercentBar";
import Projectile from "../projectiles/Projectile";

export abstract class Enemy extends Phaser.Sprite {

    mission: Mission;

    abstract defaultWidth : number;
    abstract defaultHeight: number;
    abstract animationFrameRate: number;
    abstract rotatingSprite: boolean;
    scaleFactor = 1;

    randomVelocity: number;

    targetable: boolean;

    healthBar: PercentBar;
    explodeSound: () => Phaser.Sound;

    deathSequences: DeathSequences;

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, 0, 0, texture);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.mission = mission;

        this.randomVelocity =  speed + (Math.random() * (speed * .4));
        this.targetable = true;

        this.deathSequences = new DeathSequences(this, this.mission);

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
        //get the right cell, then place into center of cell
        this.x = (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        let defaultSize = {width: this.defaultWidth, height: this.defaultHeight};
        let scaleX = (this.mission.gridDescriptor.cellWidth / defaultSize.width) * this.scaleFactor;
        let scaleY = (this.mission.gridDescriptor.cellHeight / defaultSize.height) * this.scaleFactor;

        if (this.animationFrameRate != -1) {
            this.animations.add('move');
            this.animations.play('move', this.animationFrameRate, true);
        }
        this.scale.setTo(scaleX, scaleY);
        this.anchor.setTo(0.5, 0.5);

        if (this.rotatingSprite) {
            // default to immediately south
            this.angle = 180;
        }
    }

    addHealthbar(health: number) {
        this.health = health;
        this.maxHealth = health;
        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new PercentBar(this.game, this, this, this.scaleFactor));
    }

    shot(by: Projectile) {
        this.damage(10);
        by.playShotFx();
    }

    massivelyDamage() {
        this.damage(300);
    }

    kill() {
        this.healthBar.hide();
        this.healthBar.destroy();
        this.explodeSound().play();
        this.targetable = false;
        this.alive = false;

        return this;
    }
}

export abstract class PathfindingEnemy extends Enemy {

    lastCalculation: number;
    path: {x: number; y: number, seen: boolean}[];

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, mission, texture, speed);

        this.lastCalculation = 0;
    }

    pathfind(mission: Mission, row: number, col: number) {

        //TODO base doesnt need to be in center bottom of map
        this.mission.easystar.findPath(row, col, Math.floor(mission.gridDescriptor.rows / 2), (mission.gridDescriptor.columns - 1), (path) => {
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
                let xToGo = cur.x * this.mission.gridDescriptor.cellWidth +  Math.floor(this.mission.gridDescriptor.cellWidth / 2);
                let yToGo = cur.y * this.mission.gridDescriptor.cellHeight +  Math.floor(this.mission.gridDescriptor.cellHeight / 2);

                //have we made it yet, or are we going for the first time?
                if (_.every(this.path, _ => !_.seen) || (Math.abs(xToGo - this.x) < 10 && Math.abs(yToGo - this.y) < 10)) {
                    console.log('got to next!');
                    cur.seen = true;
                    next = this.path.filter(_ => !_.seen)[0];

                    if (next) {
                        xToGo = next.x * this.mission.gridDescriptor.cellWidth +  Math.floor(this.mission.gridDescriptor.cellWidth / 2);
                        yToGo = next.y * this.mission.gridDescriptor.cellHeight +  Math.floor(this.mission.gridDescriptor.cellHeight / 2);

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

    constructor(game: Phaser.Game, mission: Mission, texture: string, speed: number) {
        super(game, mission, texture, speed);
    }

    flyTowardsBase() {

        //TODO base could be anywhere
        let xToGo = ((this.mission.gridDescriptor.rows / 2) * this.mission.gridDescriptor.cellWidth)
            + (this.mission.gridDescriptor.cellWidth / 2);
        let yToGo = ((this.mission.gridDescriptor.columns - 1) * this.mission.gridDescriptor.cellHeight)
            + (this.mission.gridDescriptor.cellHeight / 2);

        let a = this.game.physics.arcade.moveToXY(this, xToGo, yToGo, this.randomVelocity);

        let b = Phaser.Math.getShortestAngle(this.angle, Phaser.Math.radToDeg(a) + 90);
        this.game.add.tween(this).to({angle: this.angle + b}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

}

class DeathSequences {

    enemy: Enemy;
    game: Phaser.Game;
    mission: Mission;

    constructor(enemy: Enemy, mission: Mission) {
        this.enemy = enemy;
        this.game = enemy.game;
        this.mission = mission;
    }

    basicDeathSequence() : void {

        this.game.camera.shake(0.002, 300);

        let flare = this.game.add.sprite(this.enemy.x, this.enemy.y, 'explosion-flare');
        let shockwave = this.game.add.sprite(this.enemy.x, this.enemy.y, 'explosion-shockwave');


        shockwave.anchor.setTo(.5);
        flare.anchor.setTo(.5);

        shockwave.scale.setTo(0);
        // shockwave.alpha = .8;
        flare.scale.setTo(0);
        // flare.alpha = .5;

        shockwave.blendMode = PIXI.blendModes.ADD;
        flare.blendMode = PIXI.blendModes.ADD;

        let fallTween = this.game.add.tween(shockwave.scale).to({x: 3, y: 3}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
        let alphaTween = this.game.add.tween(shockwave).to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);

        let fallTween2 = this.game.add.tween(flare.scale).to({x: 1.5, y: 1.5}, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        fallTween2.onComplete.add(() => this.game.add.tween(flare.scale).to({x: 0, y: 0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false));
        let rotateTween2 = this.game.add.tween(flare).to({angle: -500}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
        let alphaTween2 = this.game.add.tween(flare).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true, 300, 0, false);

        alphaTween.onComplete.add(() => shockwave.destroy());
        alphaTween2.onComplete.add(() => flare.destroy());

        // this.game.add.tween(shockwave).to({angle: 360}, 2400, Phaser.Easing.Linear.None,
        //     true, 0);
        // this.game.add.tween(shockwave).to({alpha: 0}, 2400, Phaser.Easing.Linear.None,
        //     true, 0);

        let debris = 'debris-0' + Math.floor(Phaser.Math.random(1, 4));
        let rot = Phaser.Math.random(0,360);
        let spr = new Phaser.Sprite(this.game, this.enemy.x, this.enemy.y, debris);
        spr.anchor.setTo(.5);
        spr.angle = rot;
        this.game.add.existing(spr);
        this.mission.doodads.add(spr);
    }
}
