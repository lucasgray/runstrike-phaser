import * as _ from "lodash";

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

        this.rows = this.passableTerrain.length;
        this.columns = this.passableTerrain[0].length;

        this.cellWidth = Math.floor((this.gameWidth) / this.columns);
        this.cellHeight = Math.floor((this.gameHeight) / this.rows);
        this.width = this.columns * this.cellWidth;
        this.height =  this.rows * this.cellHeight;
    }

    //from x/y coords, return grid location
    getGridLocation(input: {x: number, y: number}): {x: number, y: number} {
        let gridX = Math.floor(input.x / this.cellWidth);
        if (gridX < 0) {
            gridX = 0;
        }
        if (gridX >= this.columns) {
            gridX = this.columns - 1;
        }
        let gridY = Math.floor(input.y / this.cellHeight);
        if (gridY < 0) {
            gridY = 0;
        }
        if (gridY >= this.rows) {
            gridY = this.rows - 1;
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

    getClosestBaseLocation(input: {x: number, y: number}): {x: number, y: number} {

        let xIn = input.x;
        let closest = _.minBy(this.baseLocations, l => Math.abs(l[0] - xIn));

        let which = Math.floor(Phaser.Math.random(0, this.baseLocations.length));
        let loc = this.baseLocations[which];

        if (closest) {
            return {x: closest[0], y: closest[1]};
        } else {
            let first = this.baseLocations[0];
            return {x: first[0], y: first[1]}
        }
    }

}
