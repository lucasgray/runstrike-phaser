"use strict";
exports.__esModule = true;
var GridDescriptor = (function () {
    /**
     *
     * @param {number} gameWidth - width of entire game
     * @param {number} gameHeight - height of entire game
     * @param {number} x - amount of columns
     * @param {number} y - amount of rows
     * @param {number} offsetX - offset x to start playing field
     */
    function GridDescriptor(gameWidth, gameHeight, x, y) {
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
    //FIXME not quite right
    GridDescriptor.prototype.getGridLocation = function (input) {
        var gridX = Math.round((input.x - this.offsetX) / this.cellWidth);
        if (gridX < 0) {
            gridX = 0;
        }
        if (gridX >= this.x) {
            gridX = this.x - 1;
        }
        var gridY = Math.round(input.y / this.cellHeight);
        if (gridY < 0) {
            gridY = 0;
        }
        if (gridY >= this.y) {
            gridY = this.y - 1;
        }
        return { x: gridX, y: gridY };
    };
    return GridDescriptor;
}());
exports["default"] = GridDescriptor;
//# sourceMappingURL=GridDescriptor.js.map