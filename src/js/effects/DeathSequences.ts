import {Enemy} from "../models/sprites/enemies/Enemy";
import Mission from "../missions/Mission";

export default class DeathSequences {

    enemy: Enemy;
    game: Phaser.Game;
    mission: Mission;

    constructor(enemy: Enemy, mission: Mission) {
        this.enemy = enemy;
        this.game = enemy.game;
        this.mission = mission;
    }

    basicDeathSequence(): void {

        this.game.camera.shake(0.005, 300);

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

        let fallTween = this.game.add.tween(shockwave.scale).to({
            x: 3,
            y: 3
        }, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
        let alphaTween = this.game.add.tween(shockwave).to({alpha: 0}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);

        let fallTween2 = this.game.add.tween(flare.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        fallTween2.onComplete.add(() => this.game.add.tween(flare.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Linear.None, true, 0, 0, false));
        let rotateTween2 = this.game.add.tween(flare).to({angle: -500}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
        let alphaTween2 = this.game.add.tween(flare).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true, 300, 0, false);

        alphaTween.onComplete.add(() => shockwave.destroy());
        alphaTween2.onComplete.add(() => flare.destroy());

        // this.game.add.tween(shockwave).to({angle: 360}, 2400, Phaser.Easing.Linear.None,
        //     true, 0);
        // this.game.add.tween(shockwave).to({alpha: 0}, 2400, Phaser.Easing.Linear.None,
        //     true, 0);

        let debris = 'debris-0' + Math.floor(Phaser.Math.random(1, 4));
        // let rot = Phaser.Math.random(0,360);
        let spr = new Phaser.Sprite(this.game, this.enemy.x, this.enemy.y, debris);
        spr.anchor.setTo(.5);
        // spr.angle = rot;
        this.game.add.existing(spr);
        this.mission.doodads.add(spr);
    }
}
