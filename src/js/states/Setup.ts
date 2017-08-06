import Button from "../prefabs/Button";
import * as gameObjects from "../objects";
import * as setupInputHandlers from "../handlers/setup"
import Mission from "../missions/Mission";
import {GameState} from "../objects/GameData";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;

    curWall: Phaser.Sprite;
    curTurret: Phaser.Sprite;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    init(mission: Mission) {
        this.mission = mission;
    }

    preload() {
    }

    create() {

        // this.objects = [];

        let background = this.game.add.sprite(this.mission.gridSize.offsetX,0,'skirmish-background');
        background.width = this.mission.gridSize.width;
        background.height = this.mission.gridSize.height;
        this.game.world.sendToBack(background);

        console.log(this.gameState.placedLoot);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {
          new gameObjects[it.type](this.game, (this.mission.gridSize.offsetX + (it.x * this.mission.gridSize.cellWidth)), it.y * this.mission.gridSize.cellHeight, [this.objects]);
        });

        this.drawInputs();
    }

    drawInputs() {

        Object.keys(setupInputHandlers).forEach((ih,index) => {
            new setupInputHandlers[ih](this.game, 50, 300 + (90 * index));
        });

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', ()=>{
                console.log("asking to go back");
                this.state.start('Missions');
            }
        );

        new Button(
            this.game,
            this.game.width - 80,
            this.game.height - 40,
            100,
            40,
            'Defend', ()=>{
                console.log("asking to defend");
                this.state.start('Play');
            }
        );
    }

    drawColor(color, x, y, callback) {
        var g = this.game.add.graphics(0, 0);
        g.lineStyle(2, color, 0.5);
        g.beginFill(color, 1);
        g.drawRect(x, y, this.mission.gridSize.cellWidth, this.mission.gridSize.cellHeight); //no anchor, need to move it!
        g.endFill();

        g.inputEnabled = true;

        if (callback) {
            g.events.onInputDown.add(callback, this.game);
        }

        return g;
    }

    update() {

        if (this.game.input.activePointer.isDown)
        {
          console.log('moving turret');
          console.log(this.curTurret);
            if (this.curTurret) {
                this.curTurret.x = this.game.input.x;
                this.curTurret.y = this.game.input.y;
            } else if (this.curWall) {
                this.curWall.x = this.game.input.x - (this.mission.gridSize.cellWidth / 2);
                this.curWall.y = this.game.input.y - (this.mission.gridSize.cellWidth / 2);
            }
        } else {
            if (this.curTurret) {

                console.log("placing turret!");
                this.curTurret.destroy();
                this.curTurret = null;

                let gridLoc = this.getGridLocation(this.game.input);

                // this.gameState.placeItem('Turret',  this.mission.name, gridLoc.x, gridLoc.y);

                // new gameObjects["Turret"](this.game, (this.mission.gridSize.offsetX + (gridLoc.x * this.mission.gridSize.cellWidth)), gridLoc.y * this.mission.gridSize.cellHeight, [this.objects]);

            } else if (this.curWall) {
                console.log("placing wall!");
                this.curWall.destroy();
                this.curWall = null;

                let gridLoc = this.getGridLocation(this.game.input);

                // this.gameState.placeItem('Wall',  this.mission.name, gridLoc.x, gridLoc.y);

                // new gameObjects["Wall"](this.game, (this.mission.gridSize.offsetX + (gridLoc.x * this.mission.gridSize.cellWidth)), gridLoc.y * this.mission.gridSize.cellHeight, [this.objects]);
            }
        }

    }

    getGridLocation(input){
      let gridX = Math.floor((input.x - this.mission.gridSize.offsetX)/ this.mission.gridSize.cellWidth);
      if(gridX < 0){
        gridX = 0;
      }
      if(gridX >= this.mission.gridSize.x){
        gridX = this.mission.gridSize.x-1;
      }
      let gridY = Math.floor(input.y / this.mission.gridSize.cellHeight);
      if(gridY < 0){
        gridY = 0;
      }
      if(gridY >= this.mission.gridSize.y){
        gridY = this.mission.gridSize.y -1;
      }
      return {x: gridX, y: gridY};
    }
}
