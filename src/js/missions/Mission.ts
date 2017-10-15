import GridDescriptor from "../models/state/GridDescriptor";

import {GameState, PlacedLootInfo} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";
import SmartGroup from "../extensions/SmartGroup";
import Projectile from "../models/sprites/projectiles/Projectile";
import * as _ from 'lodash';
import Lurker from "../models/sprites/enemies/Lurker";
import Shield from "../models/sprites/enemies/Shield";
import ShipOne from "../models/sprites/enemies/ShipOne";
import ShipTwo from "../models/sprites/enemies/ShipTwo";
import ShipThree from "../models/sprites/enemies/ShipThree";
import Turret from "../models/sprites/turrets/Turret";
import * as EasyStar from "easystarjs";
import {Targetable} from "../models/state/WeaponSystem";
import {Enemy} from "../models/sprites/enemies/Enemy";

//this is a little big, maybe we can break it up somehow

abstract class Mission {

    abstract name: string;
    abstract gridDescriptor: GridDescriptor;
    abstract background: () => Phaser.Sprite;
    abstract base: () => Phaser.Sprite;
    abstract enemyArray: Array<object>;

    //abstract baseLocation: {x: number, y: number}

    game: Phaser.Game;

    totalGrid: EasyStar.js;
    passableTerrainGrid: EasyStar.js;

    turrets: SmartGroup<Turret>;
    enemies: SmartGroup<Enemy>;
    friendlyProjectiles: SmartGroup<Projectile>;
    enemyProjectiles: SmartGroup<Projectile>;
    muzzleFlashes: Phaser.Group;
    projectileExplosions: Phaser.Group;
    doodads: Phaser.Group;

    curEnemy: number = 0;
    allDeployed: boolean;
    lastDeployment: number = Date.now();

    pendingFinalize = false;

    gameState: GameState;

    lastUpdatedGrid: number;

    constructor(game: Phaser.Game) {

        this.game = game;

        this.reset();
    }

    setGameState(gameState: GameState) {
        this.gameState = gameState;
    }

    recalculateGrid(placedItems: Array<PlacedLootInfo>) {
        this.recalculateTotalGrid(placedItems);
        this.recalculatePassableTerrainGrid();
    }

    recalculateTotalGrid(placedItems: Array<PlacedLootInfo>) {
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
        easystar.enableDiagonals();
        easystar.disableCornerCutting();
        easystar.calculate();

        this.totalGrid = easystar;
    }

    recalculatePassableTerrainGrid() {

        let easystar = new EasyStar.js();

        easystar.setGrid(this.gridDescriptor.passableTerrain);
        easystar.setAcceptableTiles([0]);
        easystar.enableDiagonals();
        easystar.disableCornerCutting();
        easystar.calculate();

        this.passableTerrainGrid = easystar;
    }

    reset() {

        if (this.enemies) {
            this.enemies.destroy(true);
        }
        if (this.turrets) {
            this.turrets.destroy(true);
        }
        if (this.friendlyProjectiles) {
            this.friendlyProjectiles.destroy(true);
        }
        if (this.enemyProjectiles) {
            this.enemyProjectiles.destroy(true);
        }
        if (this.muzzleFlashes) {
            this.muzzleFlashes.destroy(true);
        }
        if (this.projectileExplosions) {
            this.projectileExplosions.destroy(true);
        }
        if (this.doodads) {
            this.doodads.destroy(true);
        }

        this.doodads = new Phaser.Group(this.game);
        this.game.add.existing(this.doodads);
        this.turrets = new SmartGroup<Turret>(this.game);
        this.game.add.existing(this.turrets);
        this.enemies = new SmartGroup<Drone>(this.game);
        this.game.add.existing(this.enemies);
        this.friendlyProjectiles = new SmartGroup<Projectile>(this.game);
        this.game.add.existing(this.friendlyProjectiles);
        this.enemyProjectiles = new SmartGroup<Projectile>(this.game);
        this.game.add.existing(this.enemyProjectiles);
        this.muzzleFlashes = new Phaser.Group(this.game);
        this.game.add.existing(this.muzzleFlashes);
        this.projectileExplosions = new Phaser.Group(this.game);
        this.game.add.existing(this.projectileExplosions);

        this.curEnemy = 0;
        this.allDeployed = false;
        this.lastDeployment = Date.now();

        this.pendingFinalize = false;

        this.lastUpdatedGrid = Date.now();
    }

    update() {

        if (Date.now() - this.lastUpdatedGrid > 50) {
            this.totalGrid.calculate();
            this.passableTerrainGrid.calculate();
        }

        this.deploy();

        this.checkProjectileCollisions();

        if (!this.pendingFinalize) {
            this.pendingFinalize = this.checkWinOrLose();
        }
    }

    deploy() {

        if (!this.allDeployed &&
            ((Date.now() - this.lastDeployment > this.enemyArray[this.curEnemy]['delay'] || this.enemyArray[this.curEnemy]['delay'] == 0))) {

            console.log('new targetable');

            //TODO builder
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
            } else if (this.enemyArray[this.curEnemy]['type'] == "ShipOne") {
                let sprite = new ShipOne(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
                this.game.add.existing(sprite);
                this.enemies.add(sprite);
            } else if (this.enemyArray[this.curEnemy]['type'] == "ShipTwo") {
                let sprite = new ShipTwo(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
                this.game.add.existing(sprite);
                this.enemies.add(sprite);
            } else if (this.enemyArray[this.curEnemy]['type'] == "ShipThree") {
                let sprite = new ShipThree(this.game, this, this.enemyArray[this.curEnemy]['at'], 0);
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

    checkProjectileCollisions() {

        let friendlyProjectilesThatCollided = Array<Phaser.Sprite>();

        //this is NOT an observer!  It fires once in the update loop.
        this.game.physics.arcade.overlap(this.friendlyProjectiles, this.enemies, (projectile: Projectile, sprite: Enemy) => {
            if(sprite.alive && sprite.targetable && friendlyProjectilesThatCollided.indexOf(projectile) == -1){
                sprite.shot(projectile);
                friendlyProjectilesThatCollided.push(projectile);
                projectile.kill();
            }
        });

        let enemyProjectilesThatCollided = Array<Phaser.Sprite>();

        //this is NOT an observer!  It fires once in the update loop.
        this.game.physics.arcade.overlap(this.enemyProjectiles, this.turrets, (projectile: Projectile, sprite: Turret) => {
            if(sprite.alive && enemyProjectilesThatCollided.indexOf(projectile) == -1){
                sprite.shot(projectile);
                enemyProjectilesThatCollided.push(projectile);
                projectile.kill();
            }
        });
    }

    addSetupGuidelines() {
        this.gridDescriptor.placeableTerrain.forEach((r,ri) => {
            r.forEach((c,ci) => {
                if (c === 1) {
                    let hatch = new Phaser.Sprite(this.game, ci * this.gridDescriptor.cellWidth, ri * this.gridDescriptor.cellHeight, 'unplaceable-grid');
                    hatch.alpha = .25;
                    let defaultSize = {width: 64, height: 64};
                    let scaleX = (this.gridDescriptor.cellWidth / defaultSize.width);
                    let scaleY = (this.gridDescriptor.cellHeight / defaultSize.height);
                    hatch.scale.setTo(scaleX, scaleY);
                    this.game.add.existing(hatch);
                } else {
                    let empty = new Phaser.Sprite(this.game, ci * this.gridDescriptor.cellWidth, ri * this.gridDescriptor.cellHeight, 'empty-grid');
                    empty.alpha = .25;
                    let defaultSize = {width: 64, height: 64};
                    let scaleX = (this.gridDescriptor.cellWidth / defaultSize.width);
                    let scaleY = (this.gridDescriptor.cellHeight / defaultSize.height);
                    empty.scale.setTo(scaleX, scaleY);
                    this.game.add.existing(empty);
                }
            });
        });
    }

    sendTurretKilled() {
        this.recalculateGrid(this.gameState.placedLoot);
        this.enemies.forEachAlive(e => e.handleTurretKilled(), true);
    }

    shutdown() {
        this.enemies.destroy();
        this.friendlyProjectiles.destroy();
    }
}

export default Mission;
