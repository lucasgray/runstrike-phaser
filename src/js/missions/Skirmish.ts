
import Mission from './Mission';
import GridDescriptor from "../extensions/GridDescriptor";

export default class Skirmish extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Skirmish';
    background: 'skirmish-background';

    constructor(game: Phaser.Game) {
        super(game);

        this.gridDescriptor = new GridDescriptor(game.width, game.height, 15, 20);
    }

    create() {
        this.game.stage.backgroundColor = 0x002200;
    }


      // this.gridSize = {x: 15, y:20};
      // this.calculateGridSize();
      // this.game.create.grid('grid', this.gridSize.width + 1, this.gridSize.height + 1, this.gridSize.cellWidth, this.gridSize.cellHeight, '#ffffff');
      // this.enemies = [
      //   { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {x:128,y:128}, messages: ['','The','Droids','Are','Coming!']},
      //   { type: 'Drone', delay: 1000, size: 'large', at: 100},
      //   { type: 'Drone', delay: 600, size: 'medium', at: 400},
      //   { type: 'Drone', delay: 900, size: 'small', at: 500},
      //   { type: 'Drone', delay: 400, size: 'large', at: 100},
      //   { type: 'Drone', delay: 60, size: 'medium', at: 400},
      //   { type: 'Drone', delay: 300, size: 'small', at: 500},
      //   { type: 'Drone', delay: 300, size: 'large', at: 100},
      //   { type: 'Drone', delay: 300, size: 'medium', at: 400},
      //   { type: 'Drone', delay: 3000, size: 'small', at: 500}
      // ];
      // this.enemy = 0;
      // this.lastEnemy = this.enemies.length - 1;
      // this.lastDeployment = 0;
      // if(this.enemy > this.lastEnemy){
      //   this.allDeployed = true;
      // } else {
      //   this.allDeployed = false;
      // }
    // }

    update() {

        this.deploy();

        // this.checkBulletCollisions();
        //
        // this.checkWinCondition();
    }

    deploy() {
        // if (!this.allDeployed && Date.now() - this.lastDeployment > this.enemies[this.enemy].delay) {
        //     console.log(this.enemies[this.enemy].type);
        //     console.log(this.game.enemies);
        //     if (this.enemies[this.enemy].type == 'Dialogue' || this.enemies[this.enemy].type == 'Intro') {
        //         new gameObjects[this.enemies[this.enemy].type]({game: this.game, enemy: this.enemies[this.enemy]});
        //     } else {
        //         this.game.enemies.add(new gameObjects[this.enemies[this.enemy].type](this.game, this.enemies[this.enemy].at, 0));
        //     }
        //
        //     this.enemy++;
        //     if (this.enemy > this.lastEnemy) {
        //         this.allDeployed = true;
        //     }
        //     this.lastDeployment = Date.now();
        // }
    }

    // //every bullet can kill one drone.
    // checkBulletCollisions() {
    //
    //     let bulletsThatCollided = [];
    //
    //     //this is NOT an observer!  It fires once in the update loop.
    //     this.game.physics.arcade.overlap(this.game.bullets, this.game.enemies, (bullet, sprite) => {
    //         if(sprite.alive && !bulletsThatCollided.includes(bullet)){
    //             sprite.shot();
    //             bulletsThatCollided.push(bullet);
    //             bullet.kill();
    //         }
    //     }, null, this);
    //
    // }
    //
    // checkWinCondition() {
    //     if (this.allDeployed && this.game.enemies.getFirstAlive() === null) {
    //         if (this.won) {
    //             if (Date.now() - this.won > 2000) {
    //                 this.game.state.start('Victory');
    //             }
    //         } else {
    //             this.won = Date.now();
    //         }
    //     }
    // }
}
