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
var Button_1 = require("../prefabs/Button");
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(gameState) {
        var _this = _super.call(this) || this;
        _this.gameState = gameState;
        return _this;
    }
    Menu.prototype.create = function () {
        // if (!this.game.backgroundMusic || !this.game.hasStartedMusic) {
        //     this.game.backgroundMusic = this.game.add.audio('backgroundMusic');
        //     this.game.backgroundMusic.play();
        //     this.game.hasStartedMusic = true;
        // } else if (this.game.backgroundMusic && this.game.musicPause) {
        //     this.game.backgroundMusic.resume();
        // }
        //
        // this.graphics = this.game.add.graphics(0, 0);
        var _this = this;
        var bkgrd = this.game.add.image(0, 0, 'retro-background');
        bkgrd.scale.setTo(.25, .5);
        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 20, "WAR ROOM", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);
        new Button_1["default"](this.game, this.game.world.centerX, this.game.world.centerY + 125, this.game.width * 0.8, 60, 'Mission select', function () {
            console.log("asking to start mission select!");
            _this.state.start('Missions');
        });
        // Buttons.makeButton(
        //     this.game,
        //     this.game.world.centerX,
        //     this.game.world.centerY+140,
        //     this.game.width * .8,
        //     60,
        //     this.btnDownSound,
        //     'debug data', ()=>{
        //         console.log("going to data!");
        //         this.state.start('Debug');
        //     }
        // );
    };
    return Menu;
}(Phaser.State));
exports["default"] = Menu;
//# sourceMappingURL=Menu.js.map