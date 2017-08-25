import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import BlueBlob from "../projectiles/BlueBlob";

export default class BlueTurret extends Turret {

    range: number = 300;
    fireRate: number = 900;
    shoot: () => Projectile = () => new BlueBlob(this.game, this, this.tracking);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'blue-turret');
    }

}
