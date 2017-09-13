export default class GridDescriptor {
    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    gameWidth: number;
    gameHeight: number;

    rows: number;
    columns: number;

    /**
     * What cells are passable by the enemy forces
     */
    passableTerrain: Array<Array<number>>;

    /**
     * What cells should we allow turret placement
     */
    availableForPlacement: Array<Array<number>>;

    /**
     *
     * @param {number} gameWidth - width of entire game
     * @param {number} gameHeight - height of entire game
     * @param {number} rows - amount of columns
     * @param {number} columns - amount of rows
     */
    constructor(gameWidth: number, gameHeight: number, rows: number, columns: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.rows = rows;
        this.columns = columns;

        this.cellWidth = Math.floor((gameWidth) / this.rows);
        this.cellHeight = Math.floor((gameHeight) / this.columns);
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
