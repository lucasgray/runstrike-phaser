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
     * What cells are passable by the targetable forces
     */
    passableTerrain: number[][];

    /**
     * What cells should we allow turret placement
     */
    placeableTerrain: number[][];

    baseLocations: number[][];

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
        placeableTerrain: number[][],
        baseLocations: number[][]) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.passableTerrain = passableTerrain;
        this.placeableTerrain = placeableTerrain;
        this.baseLocations = baseLocations;

        this.rows = this.passableTerrain[0].length;
        this.columns = this.passableTerrain.length;

        this.cellWidth = Math.floor((this.gameWidth) / this.rows);
        this.cellHeight = Math.floor((this.gameHeight) / this.columns);
        this.width = this.rows * this.cellWidth;
        this.height = this.columns * this.cellHeight;
    }

    //from x/y coords, return grid location
    getGridLocation(input: {x: number, y: number}): {x: number, y: number} {
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

    //from grid loc, return x/y coords
    getCenterOf(input: {x: number, y: number}): {x: number, y: number} {
        return {
            x: input.x * this.cellWidth + Math.floor(this.cellWidth / 2),
            y: input.y * this.cellHeight + Math.floor(this.cellHeight / 2),
        };
    }

    getRandomBaseLocation(): number[] {
        let which = Math.floor(Phaser.Math.random(0, this.baseLocations.length));
        return this.baseLocations[which];
    }

}
