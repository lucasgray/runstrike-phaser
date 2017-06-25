import * as gameObjects from "../objects";
export default class Mission {
    constructor(game) {
      this.game = game;
    }

    update(){
    }

    shutdown(){
      this.game.stage.backgroundColor = this.previousBackground;
    }

    create(){
      this.createGrid();
      this.game.inputHandler = ()=>'';
    }

    calculateGridSize(){
      this.gridSize.cellWidth = Math.floor((this.game.width * .8) / this.gridSize.x);
      this.gridSize.cellHeight = Math.floor((this.game.height * .8) / this.gridSize.y);
      this.gridSize.width = this.gridSize.x * this.gridSize.cellWidth;
      this.gridSize.height = this.gridSize.y * this.gridSize.cellHeight;
      this.gridSize.offsetX = (this.game.width - this.gridSize.width) / 2;
    }

    createGrid(){
      this.game.enemies = this.game.add.physicsGroup();
      this.game.bullets = this.game.add.physicsGroup();
      this.game.add.sprite(this.gridSize.offsetX, 0,'grid');
      this.setupGrid();
    }

    setupGrid() {
        let easystar = new EasyStar.js();

        var grid = [];
        Array.from(new Array(this.gridSize.y)).forEach(() => {
            grid.push(new Array(this.gridSize.x).fill(0));
        });

        this.game.gameData.placedItems.forEach((it) => {
          grid[it.y][it.x] = 1;
          new gameObjects[it.type](this.game, this.gridSize.offsetX + (it.x * this.gridSize.cellWidth), it.y * this.gridSize.cellHeight);
        });

        easystar.setGrid(grid);
        easystar.setAcceptableTiles([0]);
        easystar.calculate();
        easystar.enableDiagonals();
        easystar.disableCornerCutting();

        this.game.easystar = easystar;
        this.game.easystar.calculate();
    }
}
