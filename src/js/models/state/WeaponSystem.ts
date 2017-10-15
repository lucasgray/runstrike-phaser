
import SmartGroup from "../../extensions/SmartGroup";
import Mission from "../../missions/Mission";
import Projectile from "../sprites/projectiles/Projectile";
import * as _ from "lodash";
import Base from "../sprites/base/Base";

export class WeaponSystem {

    mission: Mission;

    tracking: Targetable | undefined;
    attachedTo: Targetable;

    projectileGroup: SmartGroup<Projectile>;
    targetingGroup: SmartGroup<Targetable>;

    range: number;
    fireRate: number;

    lastShot: number;

    shoot: (to: Targetable, mission: Mission) => Projectile;

    base: Targetable | undefined;

    constructor(attachedTo: Targetable, mission: Mission, range: number,
                fireRate: number, targetingGroup: SmartGroup<Targetable>,
                projectileGroup: SmartGroup<Projectile>, base: Base | undefined,
                shoot: (to: Targetable, mission: Mission) => Projectile) {

        this.attachedTo = attachedTo;
        this.mission = mission;
        this.range = range;
        this.fireRate = fireRate;

        this.targetingGroup = targetingGroup;
        this.projectileGroup = projectileGroup;
        this.shoot = shoot;
        this.lastShot = Date.now();
        this.base = base;
    }

    update() {
        if (this.attachedTo.alive) {
            this.maybeShoot();
        }
    }

    maybeShoot() {

        this.tracking = this.closestTargetable();

        if (Date.now() - this.lastShot > (this.fireRate + (Math.random() * 200))
            && this.tracking
            && Phaser.Math.distance(this.attachedTo.x, this.attachedTo.y, this.tracking.x, this.tracking.y) < this.range) {

            let projectile = this.shoot(this.tracking, this.mission);
            this.attachedTo.game.add.existing(projectile);
            this.projectileGroup.add(projectile);
            this.lastShot = Date.now();
        }
    }

    closestTargetable(): Targetable | undefined {

        let spriteDistances = this.targetingGroup
            .all()
            .filter(s => s.alive && s.targetable)
            .map((sprite) => {
                    return {
                        distance: Math.abs(sprite.x - this.attachedTo.x) + Math.abs(sprite.y - this.attachedTo.y),
                        sprite: sprite
                    };
                }
            );

        let closestTargetable = _.minBy(spriteDistances, (s) => s.distance);

        let baseDistance: number | undefined = undefined;
        if (this.base) {
             baseDistance = Phaser.Math.distance(this.attachedTo.x, this.attachedTo.y, this.base.x, this.base.y);
        }

        if (closestTargetable && baseDistance) {
            return closestTargetable.distance < baseDistance ? closestTargetable.sprite : this.base;
        } else if (closestTargetable) {
            return closestTargetable.sprite;
        } else if (this.base) {
            return this.base;
        }

        return undefined;
    }
}

export interface Targetable extends Phaser.Sprite {
    targetable: boolean;
}
