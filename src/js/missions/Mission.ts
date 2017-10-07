import GridDescriptor from "../models/state/GridDescriptor";
import * as EasyStar from 'easystarjs';
import {PlacedLootInfo} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";
import SmartGroup from "../extensions/SmartGroup";
import Projectile from "../models/sprites/projectiles/Projectile";
import * as _ from 'lodash';
import Lurker from "../models/sprites/enemies/Lurker";
import Shield from "../models/sprites/enemies/Shield";
import {Enemy} from "../models/sprites/enemies/Enemy";

//this is a little big, maybe we can break it up somehow

abstract class Mission {

    abstract name: string;
    abstract gridDescriptor: GridDescriptor;
    abstract background: () => Phaser.Sprite;
    abstract enemyArray: Array<object>;

    //abstract baseLocation: {x: number, y: number}

    game: Phaser.Game;
    easystar: EasyStar.js;

    //for now, leave this as just a group. we don't use it to iterate over turrets yet
    //and turrets have the weird thing with base/turret cant be children etc
    turrets: Phaser.Group;
    enemies: SmartGroup<Enemy>;
    projectiles: SmartGroup<Projectile>;
    muzzleFlashes: Phaser.Group;
    projectileExplosions: Phaser.Group;

    deathEmitter1: Phaser.Particles.Arcade.Emitter;
    deathEmitter2: Phaser.Particles.Arcade.Emitter;

    curEnemy: number = 0;
    allDeployed: boolean;
    lastDeployment: number = Date.now();

    pendingFinalize = false;

    constructor(game: Phaser.Game) {

        this.game = game;

        this.reset();
    }

    recalculateGrid(placedItems: Array<PlacedLootInfo>) {

        let myLoot =  placedItems.filter(it => it.mission === this.name);

        let easystar = new EasyStar.js();

        let lootGrid = Array<Array<number>>();
        for (let y = 0; y < this.gridDescriptor.columns; y++) {
            let f = Array<number>();
            for (let x = 0; x < this.gridDescriptor.rows; x++) {
                f.push(0);
            }
            lootGrid.push(f);
        }

        myLoot.forEach((i) =>{
           lootGrid[i.col][i.row] = 1;
        });

        let allTogetherNow : number[][] = _.zipWith(lootGrid, this.gridDescriptor.passableTerrain, (i,j) => {
            return _.zipWith(i,j, (k,l) => Math.max(k,l));
        });

        easystar.setGrid(allTogetherNow);
        easystar.setAcceptableTiles([0]);
        easystar.calculate();
        easystar.enableDiagonals();
        easystar.disableCornerCutting();
        easystar.calculate();

        this.easystar = easystar;
    }

    reset() {

        if (this.enemies) {
            this.enemies.destroy(true);
        }
        if (this.turrets) {
            this.turrets.destroy(true);
        }
        if (this.projectiles) {
            this.projectiles.destroy(true);
        }

        this.turrets = new Phaser.Group(this.game);
        this.game.add.existing(this.turrets);
        this.enemies = new SmartGroup<Drone>(this.game);
        this.game.add.existing(this.enemies);
        this.projectiles = new SmartGroup<Projectile>(this.game);
        this.game.add.existing(this.projectiles);
        this.muzzleFlashes = new Phaser.Group(this.game);
        this.game.add.existing(this.muzzleFlashes);
        this.projectileExplosions = new Phaser.Group(this.game);
        this.game.add.existing(this.projectileExplosions);

        this.curEnemy = 0;
        this.allDeployed = false;
        this.lastDeployment = Date.now();

        this.pendingFinalize = false;

        this.deathEmitter1 = this.game.add.emitter(0, 0, 100);
        this.deathEmitter2 = this.game.add.emitter(0, 0, 100);
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

        if (!this.allDeployed &&
            ((Date.now() - this.lastDeployment > this.enemyArray[this.curEnemy]['delay'] || this.enemyArray[this.curEnemy]['delay'] == 0))) {

            console.log('new enemy');

            if (this.enemyArray[this.curEnemy]['type'] == "Drone") {
                let sprite = new Drone(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
                this.game.add.existing(sprite);
                this.enemies.add(sprite);
            } else if (this.enemyArray[this.curEnemy]['type'] == "Lurker") {
                let sprite = new Lurker(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
                this.game.add.existing(sprite);
                this.enemies.add(sprite);
            } else if (this.enemyArray[this.curEnemy]['type'] == "Shield") {
                let sprite = new Shield(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
                this.game.add.existing(sprite);
                this.enemies.add(sprite);
            }


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
                this.game.state.start('Victory', true, false, this);
            }, 2000);
        }

        if (lost) {
            setTimeout(() => {
                this.game.state.start('Defeat', true, false, this);
            }, 500);
        }

        if (won || lost) {
            return true;
        } else return false;
    }

    checkBulletCollisions() {

        let bulletsThatCollided = Array<Phaser.Sprite>();

        //this is NOT an observer!  It fires once in the update loop.
        this.game.physics.arcade.overlap(this.projectiles, this.enemies, (projectile: Projectile, sprite) => {
            if(sprite.alive && sprite.targetable && bulletsThatCollided.indexOf(projectile) == -1){
                sprite.shot(projectile);
                bulletsThatCollided.push(projectile);
                projectile.kill();
            }
        });
    }

    playDeathEmitter(x: number, y: number) {

        this.deathEmitter1.x = x;
        this.deathEmitter1.y = y;
        this.deathEmitter2.x = x;
        this.deathEmitter2.y = y;

        this.deathEmitter1.makeParticles('blue-spark');
        this.deathEmitter1.gravity.setTo(0,0);
        this.deathEmitter1.maxParticleSpeed.x = 700;
        this.deathEmitter1.minParticleSpeed.x = -700;
        this.deathEmitter1.maxParticleSpeed.y = 700;
        this.deathEmitter1.minParticleSpeed.y = -700;
        this.deathEmitter1.setScale(.5, .05, .5, .05, 500, Phaser.Easing.Cubic.Out);
        this.deathEmitter1.start(true, 500, undefined, 10);

        this.deathEmitter2.makeParticles('red-spark');
        this.deathEmitter2.gravity.setTo(0,0);
        this.deathEmitter2.maxParticleSpeed.x = 700;
        this.deathEmitter2.minParticleSpeed.x = -700;
        this.deathEmitter2.maxParticleSpeed.y = 700;
        this.deathEmitter2.minParticleSpeed.y = -700;
        this.deathEmitter2.setScale(.5, .05, .5, .05, 500, Phaser.Easing.Cubic.Out);
        this.deathEmitter2.start(true, 500, undefined, 10);
    }

    shutdown() {
        this.enemies.destroy();
        this.projectiles.destroy();
    }
}

export default Mission;
