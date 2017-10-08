export default class GridDescriptor {

    /**
     * How many rows should the grid be?
     */
    rows: number;

    /**
     * How many columns should the grid be?
     */
    columns: number;

    /**
     * What cells are passable by the enemy forces
     */
    passableTerrain: number[][];

    /**
     * What cells should we allow turret placement
     */
    placeableTerrain: number[][];

    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    gameWidth: number;
    gameHeight: number;

    constructor(
        gameWidth: number,
        gameHeight: number,
        passableTerrain: number[][],
        placeableTerrain: number[][]) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.passableTerrain = passableTerrain;
        this.placeableTerrain = placeableTerrain;

        this.rows = this.passableTerrain[0].length;
        this.columns = this.passableTerrain.length;

        this.cellWidth = Math.floor((this.gameWidth) / this.rows);
        this.cellHeight = Math.floor((this.gameHeight) / this.columns);
        this.width = this.rows * this.cellWidth;
        this.height = this.columns * this.cellHeight;
    }

    getGridLocation(input) {
        let gridX = Math.floor(input.x / this.cellWidth);
        if (gridX < 0) {
            gridX = 0;
        }
        if (gridX >= this.rows) {
            gridX = this.rows - 1;
        }
        let gridY = Math.floor(input.y / this.cellHeight);
        if (gridY < 0) {
            gridY = 0;
        }
        if (gridY >= this.columns) {
            gridY = this.columns - 1;
        }
        return {x: gridX, y: gridY};
    }

}
