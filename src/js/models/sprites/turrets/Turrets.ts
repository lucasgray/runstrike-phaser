import Mission from "../../../missions/Mission";
import Turret from "./Turret";
import Projectile from "../projectiles/Projectile";
import BlueBlob from "../projectiles/BlueBlob";
import SmallRocket from "../projectiles/SmallRocket";
import GreenBlob from "../projectiles/GreenBlob";

export class BlueTurret extends Turret {

    range: number = 300;
    fireRate: number = 900;
    shoot: () => Projectile = () => new BlueBlob(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'blue-turret');
    }

}

export class RedTurret extends Turret {

    range: number = 300;
    fireRate: number = 500;
    shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'red-turret');
    }

}

export class YellowTurret extends Turret {

    range: number = 300;
    fireRate: number = 500;
    shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'yellow-turret');
    }

}

export class OrangeTurret extends Turret {

    range: number = 300;
    fireRate: number = 500;
    shoot: () => Projectile = () => new SmallRocket(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'orange-turret');
    }

}

export class GreenTurret extends Turret {

    range: number = 300;
    fireRate: number = 900;
    shoot: () => Projectile = () => new GreenBlob(this.game, this, this.tracking, this.mission.gridDescriptor);

    constructor(mission: Mission, game: Phaser.Game, row: number, col: number) {
        super(mission, game, row, col, 'green-turret');
    }

}
