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

    createGrid(){
      this.game.enemies = this.game.add.physicsGroup();
      this.game.add.sprite(0,0,'grid');
      this.cellWidth = (this.game.world.width * .8) / this.gridSize.x;
      this.cellHeight = (this.game.world.height * .8) / this.gridSize.y;
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
          new gameObjects[it.type](this.game, it.x * this.cellWidth, it.y * this.cellHeight);
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
