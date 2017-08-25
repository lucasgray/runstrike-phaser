import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import GreenBlob from "../projectiles/GreenBlob";

export default class GreenTurret extends Turret {

    range: number = 300;
    fireRate: number = 900;
    shoot: () => Projectile = () => new GreenBlob(this.game, this, this.tracking);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'green-turret');
    }

}
