"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Mission_1 = require("./Mission");
var Skirmish = (function (_super) {
    __extends(Skirmish, _super);
    function Skirmish(gameState) {
        return _super.call(this) || this;
    }
    Skirmish.prototype.create = function () {
        this.game.stage.backgroundColor = 0x002200;
    };
    // this.name = 'Skirmish';
    //
    // this.gridSize = {x: 15, y:20};
    // this.calculateGridSize();
    // this.game.create.grid('grid', this.gridSize.width + 1, this.gridSize.height + 1, this.gridSize.cellWidth, this.gridSize.cellHeight, '#ffffff');
    // this.enemies = [
    //   { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {x:128,y:128}, messages: ['','The','Droids','Are','Coming!']},
    //   { type: 'Drone', delay: 1000, size: 'large', at: 100},
    //   { type: 'Drone', delay: 600, size: 'medium', at: 400},
    //   { type: 'Drone', delay: 900, size: 'small', at: 500},
    //   { type: 'Drone', delay: 400, size: 'large', at: 100},
    //   { type: 'Drone', delay: 60, size: 'medium', at: 400},
    //   { type: 'Drone', delay: 300, size: 'small', at: 500},
    //   { type: 'Drone', delay: 300, size: 'large', at: 100},
    //   { type: 'Drone', delay: 300, size: 'medium', at: 400},
    //   { type: 'Drone', delay: 3000, size: 'small', at: 500}
    // ];
    // this.enemy = 0;
    // this.lastEnemy = this.enemies.length - 1;
    // this.lastDeployment = 0;
    // if(this.enemy > this.lastEnemy){
    //   this.allDeployed = true;
    // } else {
    //   this.allDeployed = false;
    // }
    // }
    Skirmish.prototype.update = function () {
        this.deploy();
        // this.checkBulletCollisions();
        //
        // this.checkWinCondition();
    };
    Skirmish.prototype.deploy = function () {
        // if (!this.allDeployed && Date.now() - this.lastDeployment > this.enemies[this.enemy].delay) {
        //     console.log(this.enemies[this.enemy].type);
        //     console.log(this.game.enemies);
        //     if (this.enemies[this.enemy].type == 'Dialogue' || this.enemies[this.enemy].type == 'Intro') {
        //         new gameObjects[this.enemies[this.enemy].type]({game: this.game, enemy: this.enemies[this.enemy]});
        //     } else {
        //         this.game.enemies.add(new gameObjects[this.enemies[this.enemy].type](this.game, this.enemies[this.enemy].at, 0));
        //     }
        //
        //     this.enemy++;
        //     if (this.enemy > this.lastEnemy) {
        //         this.allDeployed = true;
        //     }
        //     this.lastDeployment = Date.now();
        // }
    };
    return Skirmish;
}(Mission_1["default"]));
exports["default"] = Skirmish;
//# sourceMappingURL=Skirmish.js.map