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
var Victory = (function (_super) {
    __extends(Victory, _super);
    function Victory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Victory.prototype.create = function () {
        var _this = this;
        this.game.backgroundMusic.pause();
        this.game.musicPause = true;
        var win = this.game.add.audio('win');
        win.play();
        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, "Victory!", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);
        new Button_1["default"](this.game, 100, this.game.height - 40, 100, 40, 'back', function () {
            console.log("asking to go to menu");
            _this.state.start('Menu');
        });
    };
    return Victory;
}(Phaser.State));
exports["default"] = Victory;
//# sourceMappingURL=Victory.js.map