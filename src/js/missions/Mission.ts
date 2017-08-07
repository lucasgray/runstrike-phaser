import * as EasyStar from "easystarjs";
import GridDescriptor from "../extensions/GridDescriptor";

export default class Mission extends Phaser.State {

    name: string;
    gridSize: GridDescriptor;

    constructor() {
      super();
      this.gridSize = new GridDescriptor();
    }

    update(){
    }

    shutdown(){
    }

    create(){
      this.createGrid();
    }

    calculateGridSize(){
      this.gridSize.cellWidth = Math.floor((this.game.width * .8) / this.gridSize.x);
      this.gridSize.cellHeight = Math.floor((this.game.height * .8) / this.gridSize.y);
      this.gridSize.width = this.gridSize.x * this.gridSize.cellWidth;
      this.gridSize.height = this.gridSize.y * this.gridSize.cellHeight;
      this.gridSize.offsetX = (this.game.width - this.gridSize.width) / 2;
    }

    createGrid(){
      // this.game.enemies = this.game.add.physicsGroup();
      // this.game.bullets = this.game.add.physicsGroup();
      let background = this.game.add.sprite(this.gridSize.offsetX, 0,'skirmish-background');
      background.width = this.gridSize.width;
      background.height = this.gridSize.height;
      this.game.world.sendToBack(background);
      // this.setupGrid();
    }

    // setupGrid() {
    //     let easystar = new EasyStar.js();
    //
    //     var grid = [];
    //     Array.from(new Array(this.gridSize.y)).forEach(() => {
    //         grid.push(new Array(this.gridSize.x).fill(0));
    //     });
    //
    //     this.game.gameData.placedItems.forEach((it) => {
    //       grid[it.y][it.x] = 1;
    //       new gameObjects[it.type](this.game, this.gridSize.offsetX + (it.x * this.gridSize.cellWidth), it.y * this.gridSize.cellHeight);
    //     });
    //
    //     easystar.setGrid(grid);
    //     easystar.setAcceptableTiles([0]);
    //     easystar.calculate();
    //     easystar.enableDiagonals();
    //     easystar.disableCornerCutting();
    //
    //     this.game.easystar = easystar;
    //     this.game.easystar.calculate();
    // }
}
