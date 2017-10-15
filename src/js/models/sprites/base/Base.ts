import {Targetable} from "../../state/WeaponSystem";
import Projectile from "../projectiles/Projectile";
import DeathSequences from "../../../effects/DeathSequences";
import Mission from "../../../missions/Mission";

export default class Base extends Phaser.Sprite implements Targetable {

    targetable: boolean = true;
    deathSequences: DeathSequences;

    constructor(game: Phaser.Game, mission: Mission, x: number, y: number) {
        super(game, x, y, 'base');

        this.deathSequences = new DeathSequences(this, mission);
    }

    shot(by: Projectile) {
        this.damage(by.damageAmount);
        by.playShotFx();
    }

    kill() {
        super.kill();

        this.deathSequences.baseDeathSequence();

        return this;
    }

}
