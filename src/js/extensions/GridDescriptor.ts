export default class GridDescriptor {
    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    offsetX: number;
    offsetY: number;

    gameWidth: number;
    gameHeight: number;

    x: number;
    y: number;

    /**
     *
     * @param {number} gameWidth - width of entire game
     * @param {number} gameHeight - height of entire game
     * @param {number} x - amount of columns
     * @param {number} y - amount of rows
     * @param {number} offsetX - offset x to start playing field
     */
    constructor(gameWidth: number, gameHeight: number, x: number, y: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.x = x;
        this.y = y;

        this.cellWidth = Math.floor((gameWidth * .8) / this.x);
        this.cellHeight = Math.floor((gameHeight * .8) / this.y);
        this.width = this.x * this.cellWidth;
        this.height = this.y * this.cellHeight;
        this.offsetX = (gameWidth - this.width) / 2;
    }

    getGridLocation(input){
        let gridX = Math.round((input.x - this.offsetX)/ this.cellWidth);
        if(gridX < 0){
            gridX = 0;
        }
        if(gridX >= this.x){
            gridX = this.x-1;
        }
        let gridY = Math.round(input.y / this.cellHeight);
        if(gridY < 0){
            gridY = 0;
        }
        if(gridY >= this.y){
            gridY = this.y -1;
        }
        return {x: gridX, y: gridY};
    }

}
