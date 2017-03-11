import * as gameObjects from "../objects";

export default class Defend {
    constructor(game) {
      this.game = game;
      this.enemies = [
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 600, size: 'medium', at: 400},
        { type: 'Drone', delay: 900, size: 'small', at: 500},
        { type: 'Drone', delay: 400, size: 'large', at: 100},
        { type: 'Drone', delay: 60, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 3000, size: 'small', at: 500},
        { type: 'Drone', delay: 900, size: 'small', at: 500},
        { type: 'Drone', delay: 400, size: 'large', at: 100},
        { type: 'Drone', delay: 60, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 3000, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 900, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 900, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 300, size: 'large', at: 100},
        { type: 'Drone', delay: 900, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500},
        { type: 'Drone', delay: 900, size: 'large', at: 100},
        { type: 'Drone', delay: 300, size: 'medium', at: 400},
        { type: 'Drone', delay: 300, size: 'small', at: 500}
      ];
      this.enemy = 0;
      this.lastEnemy = this.enemies.length - 1;
      this.lastDeployment = 0;
      if(this.enemy > this.lastEnemy){
        this.allDeployed = true;
      }
    }

    update(sprites, objects){
      if(!this.allDeployed && Date.now() - this.lastDeployment > this.enemies[this.enemy].delay){

        sprites.add(new gameObjects[this.enemies[this.enemy].type](this.game, this.enemies[this.enemy].at, 0, [objects]));

        this.enemy++;
        if(this.enemy > this.lastEnemy){
          this.allDeployed = true;
        }
        this.lastDeployment = Date.now();
      }
    }
}
