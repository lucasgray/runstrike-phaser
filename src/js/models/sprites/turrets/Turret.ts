import * as _ from 'lodash';
import Projectile from '../projectiles/Projectile';
import Mission from "../../../missions/Mission";
import PercentBar from "../enemies/PercentBar";
import {Targetable, WeaponSystem} from "../../state/WeaponSystem";
import DeathSequences from "../../../effects/DeathSequences";

abstract class Turret extends Phaser.Sprite implements Targetable {

    mission: Mission;

    abstract range: number;
    abstract fireRate: number;

    row: number;
    col: number;

    rotationTween: Phaser.Tween;

    //base is base + shadow, turret is just the top of the turret
    base: Phaser.Group;
    turret: Phaser.Sprite;

    healthBar: PercentBar;

    targetable = true;

    weaponSystem: WeaponSystem;
    deathSequences: DeathSequences;

    abstract shoot: (to: Targetable, mission: Mission) => Projectile;

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number, texture: string, offsetX: number, offsetY: number) {
        super(game, 0, 0, '');

        this.mission = mission;

        //get the right cell, then place into center of cell
        this.x = (row * mission.gridDescriptor.cellWidth) + (mission.gridDescriptor.cellWidth / 2);
        this.y = (col * mission.gridDescriptor.cellHeight) + (mission.gridDescriptor.cellHeight / 2);

        this.row = row;
        this.col = col;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        let defaultSize = {width: 64, height: 64};
        let scaleX = mission.gridDescriptor.cellWidth / defaultSize.width;
        let scaleY = mission.gridDescriptor.cellHeight / defaultSize.height;
        this.anchor.setTo(0.5);
        this.scale.setTo(scaleX, scaleY);
        this.inputEnabled = false;

        let baseShadow = new Phaser.Sprite(game, this.x - 4, this.y + 2, 'turret-base');
        baseShadow.anchor.set(0.5);
        baseShadow.tint = 0x191919;
        baseShadow.alpha = .9;
        // baseShadow.blendMode = PIXI.blendModes.LUMINOSITY;
        baseShadow.scale.setTo(scaleX, scaleY);

        let base = new Phaser.Sprite(game, this.x, this.y, 'turret-base');
        base.anchor.setTo(0.5);
        base.scale.setTo(scaleX, scaleY);

        let turret = new Phaser.Sprite(game, offsetX, offsetY, texture);
        this.game.physics.enable(turret, Phaser.Physics.ARCADE);
        turret.anchor.setTo(0.5);
        this.turret = turret;

        let turretShadow = new Phaser.Sprite(game, offsetX - 4, offsetY + 2, texture);
        turretShadow.anchor.set(0.5);
        turretShadow.tint = 0x191919;
        turretShadow.alpha = .9;
        // turretShadow.blendMode = PIXI.blendModes.LUMINOSITY;

        this.base = new Phaser.Group(this.game);
        this.base.add(baseShadow);
        this.base.add(base);

        this.addChild(turretShadow);
        this.addChild(turret);

        this.deathSequences = new DeathSequences(this, this.mission);
    }

    makeWeaponSystem(range: number, fireRate: number, mission: Mission, shoot: (to: Targetable, mission: Mission) => Projectile) {
        this.weaponSystem = new WeaponSystem(this, mission, range, fireRate, mission.enemies, mission.friendlyProjectiles, undefined, shoot);
    }

    addHealthbar(curHealth: number, maxHealth: number) {
        this.health = curHealth;
        this.maxHealth = maxHealth;
        //health bar starts off on top?
        this.healthBar = this.game.add.existing(new PercentBar(this.game, this, this.base.getFirstExists(true), 5, 1.45, Phaser.BOTTOM_CENTER));
    }

    update() {

        //turrets should always be aiming (rotating) towards the current targetable,
        //then when the timer is up it shoots!

        //we either have a current targetable or we dont. if we do, and its alive,
        //rotate with it

        //if we dont. and there are others alive, start moving towards that one (slowly)
        //that means start angular velocity (left or right?) until we == or >= the angle we need
        //then keep rotating

        //just periodically shoot on a timer

        //doRotation needs to be first, it determines if we need to tween a rotation to the next sprite
        this.doRotation();
        this.weaponSystem.update();
    }

    doRotation() {

        //if we're rotating to a tween do nothing
        if (this.rotationTween && this.rotationTween.isRunning) return;

        let sprite = this.weaponSystem.closestTargetable();

        if (!sprite) return;

        //if its a new sprite or the current tracking sprite is dead, tween the rotation to it
        if (sprite !== this.weaponSystem.tracking || !this.weaponSystem.tracking || !this.weaponSystem.tracking.alive) {

            //where we need to be
            let angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.x, this.y, sprite.x, sprite.y)) + 90;

            //figure out the best rotation (do we go negative or positive?)
            let bestAngle = Phaser.Math.getShortestAngle(this.angle, angle);
            let tween = this.game.add.tween(this).to({angle: this.angle + bestAngle}, 400, Phaser.Easing.Linear.None);
            tween.start();

            this.rotationTween = tween;
            //else keep tracking it
        } else {
            this.angle = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.x, this.y, sprite.x, sprite.y)) + 90;
        }
    }

    kill() {
        super.kill();

        let whereAmI = this.mission.gridDescriptor.getGridLocation({x: this.x, y: this.y});
        this.mission.gameState.unplaceItem('auto_turret', this.mission.name, whereAmI.x, whereAmI.y);
        this.deathSequences.basicDeathSequence();

        this.healthBar.destroy();
        this.mission.sendTurretKilled();

        this.targetable = false;
        this.visible = false;
        this.base.visible = false;
        this.base.kill();
        this.turret.visible = false;
        this.turret.kill();

        return this;
    }
    shot(by: Projectile) {
        this.damage(10);
        by.playShotFx();
    }
}

export default Turret;
