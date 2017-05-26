import * as gameObjects from "../objects";
import Mission from './Mission';

export default class Skirmish extends Mission {
    constructor(game) {
      super(game);
      this.game.stage.backgroundColor = 0x002200;
      this.gridSize = {x: 20, y:30, width: this.game.width * .8, height: this.game.height * .8};
      this.gridSize.cellWidth = this.gridSize.width / this.gridSize.x;
      this.gridSize.cellHeight = this.gridSize.height / this.gridSize.y;
      this.game.create.grid('grid', this.gridSize.width, this.gridSize.height, this.gridSize.cellWidth, this.gridSize.cellHeight, '#ffffff');
      this.enemies = [
        { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/clock.png', imageSize: {x:128,y:128}, messages: ['','The','Droids','Are','Coming!']},
        { type: 'Drone', delay: 1000, size: 'large', at: 100},
        { type: 'Drone', delay: 600, size: 'medium', at: 400},
        { type: 'Drone', delay: 900, size: 'small', at: 500},
        { type: 'Drone', delay: 400, size: 'large', at: 100},
        { type: 'Drone', delay: 60, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 3000, size: 'small', at: 500}
      ];
      this.enemy = 0;
      this.lastEnemy = this.enemies.length - 1;
      this.lastDeployment = 0;
      if(this.enemy > this.lastEnemy){
        this.allDeployed = true;
      } else {
        this.allDeployed = false;
      }
    }

    update(){
      if(!this.allDeployed && Date.now() - this.lastDeployment > this.enemies[this.enemy].delay){
        console.log(this.enemies[this.enemy].type);
        console.log(this.game.enemies);
        if(this.enemies[this.enemy].type == 'Dialogue' || this.enemies[this.enemy].type == 'Intro'){
          new gameObjects[this.enemies[this.enemy].type]({game: this.game, enemy: this.enemies[this.enemy]});
        } else {
          this.game.enemies.add(new gameObjects[this.enemies[this.enemy].type](this.game, this.enemies[this.enemy].at, 0));
        }

        this.enemy++;
        if(this.enemy > this.lastEnemy){
          this.allDeployed = true;
        }
        this.lastDeployment = Date.now();
      }

      // Check win condition
      if(this.allDeployed && this.game.enemies.getFirstAlive() === null){
        if(this.won){
          if(Date.now() - this.won > 2000){
            this.game.state.start('Victory');
          }
        } else {
          this.won = Date.now();
        }
      }
    }
}
