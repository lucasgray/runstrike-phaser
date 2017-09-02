import GridDescriptor from "../models/state/GridDescriptor";
import * as EasyStar from 'easystarjs';
import {PlacedLootInfo} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";
import SmartGroup from "../extensions/SmartGroup";
import Projectile from "../models/sprites/projectiles/Projectile";
import * as _ from 'lodash';

//this is a little big, maybe we can break it up somehow

abstract class Mission {

    abstract name: string;
    abstract gridDescriptor: GridDescriptor;
    abstract background: () => Phaser.Sprite;
    abstract enemyArray: Array<object>;

    game: Phaser.Game;
    easystar: EasyStar.js;

    enemies: SmartGroup<Drone>;
    projectiles: SmartGroup<Projectile>;

    placedItems: Array<PlacedLootInfo>;

    curEnemy: number = 0;
    allDeployed: boolean;
    lastDeployment: number = Date.now();

    pendingFinalize = false;

    constructor(game: Phaser.Game, placedItems: Array<PlacedLootInfo>) {

        this.game = game;
        this.placedItems = placedItems;

        this.enemies = new SmartGroup<Drone>(this.game);
        this.projectiles = new SmartGroup<Projectile>(this.game);
    }

    recalculateGrid() {

        let easystar = new EasyStar.js();

        let grid = Array<Array<number>>();
        for (let y = 0; y < this.gridDescriptor.y; y++) {
            let f = Array<number>();
            for (let x = 0; x < this.gridDescriptor.x; x++) {
                f.push(0);
            }
            grid.push(f);
        }

        this.placedItems.forEach((i) =>{
           grid[i.col][i.row] = 1;
        });

        easystar.setGrid(grid);
        easystar.setAcceptableTiles([0]);
        easystar.calculate();
        easystar.enableDiagonals();
        easystar.enableCornerCutting();
        easystar.calculate();

        this.easystar = easystar;
    }

    update() {

        this.easystar.calculate();

        this.deploy();

        this.checkBulletCollisions();

        if (!this.pendingFinalize) {
            this.pendingFinalize = this.checkWinOrLose();
        }
    }

    deploy() {

        if (!this.allDeployed && Date.now() - this.lastDeployment > this.enemyArray[this.curEnemy]['delay']) {

            console.log('new drone');

            let drone = new Drone(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
            this.game.add.existing(drone);
            this.enemies.add(drone);

            this.curEnemy++;
            if (this.curEnemy >= this.enemyArray.length) {
                this.allDeployed = true;
            }
            this.lastDeployment = Date.now();
        }
    }

    checkWinOrLose() : boolean {
        let won = this.allDeployed && !this.enemies.getFirstAlive();

        let lost = _.some(this.enemies.all(), s => {
            return s.alive && s.targetable &&
            s.y > this.gridDescriptor.height - (this.gridDescriptor.cellHeight / 2)
        });

        if (won) {
            setTimeout(() => {
                this.game.state.start('Victory');
            }, 2000);
        }

        if (lost) {
            setTimeout(() => {
                this.game.state.start('Defeat');
            }, 500);
        }

        if (won || lost) {
            return true;
        } else return false;
    }

    checkBulletCollisions() {

        let bulletsThatCollided = Array<Phaser.Sprite>();

        //this is NOT an observer!  It fires once in the update loop.
        this.game.physics.arcade.overlap(this.projectiles, this.enemies, (bullet, sprite) => {
            if(sprite.alive && sprite.targetable && bulletsThatCollided.indexOf(bullet) == -1){
                sprite.shot();
                bulletsThatCollided.push(bullet);
                bullet.kill();
            }
        });

    }

    shutdown() {
        this.enemies.destroy();
        this.projectiles.destroy();
    }
}

export default Mission;
