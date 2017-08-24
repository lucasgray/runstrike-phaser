import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import SmallRocket from "../projectiles/SmallRocket";

export default class OrangeTurret extends Turret {

    range: number = 300;
    fireRate: number = 500;
    shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'orange-turret');
    }

}
