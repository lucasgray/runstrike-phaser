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
var WebFont = require("webfontloader");
require('../../css/joystix-monospace.ttf');
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ready = false;
        return _this;
    }
    Preload.prototype.create = function () {
        this.game.renderer.renderSession.roundPixels = true;
    };
    Preload.prototype.preload = function () {
        WebFont.load({
            google: {
                families: ['Righteous']
            },
            custom: {
                families: ['Joystix'],
                urls: [require('../../css/fonts.css')]
            }
        });
        var loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        var loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        loaderBg.anchor.setTo(0.5);
        loaderBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(loaderBar);
        this.load.audio('backgroundMusic', [require('../../audio/music/chiptune-dance.mp3')]);
        this.load.audio('crash-1', [require('../../audio/sounds/crash-1.wav')]);
        this.load.audio('crash-2', [require('../../audio/sounds/crash-2.wav')]);
        this.load.audio('shoot', [require('../../audio/sounds/shoot-9.wav')]);
        this.load.audio('button', [require('../../audio/sounds/button.wav')]);
        this.load.audio('place-item', [require('../../audio/sounds/points-06.mp3')]);
        this.load.audio('win', [require('../../audio/sounds/win.mp3')]);
        this.load.audio('lose', [require('../../audio/sounds/lose.mp3')]);
        //new stuff
        this.game.load.image('cocktail_icon', require('../../img/cocktail.png')); //128x128
        this.game.load.image('grenade_icon', require('../../img/grenade.png')); //128x128
        this.game.load.spritesheet('drone', require('../../img/drone.png').toString(), 128, 128, 3); // 128x128 with 3 frames (option param)
        this.game.load.spritesheet('hack', require('../../img/hack.png').toString(), 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', require('../../img/explosion.png').toString(), 86, 86);
        this.game.load.image('bullet', require('../../img/bullet.png'));
        this.game.load.image('turret', require('../../img/turret.png'));
        this.game.load.image('yellow-turret', require('../../img/yellow-turret.png'));
        this.game.load.image('red-turret', require('../../img/red-turret.png'));
        this.game.load.image('orange-turret', require('../../img/orange-turret.png'));
        this.game.load.image('green-turret', require('../../img/green-turret.png'));
        this.game.load.image('retro-background', require('../../img/retro-background.jpg'));
        this.game.load.image('skirmish-background', require('../../img/skirmish-background.jpg'));
    };
    Preload.prototype.update = function () {
        if (this.cache.isSoundDecoded("backgroundMusic") && this.ready === false) {
            this.state.start('Menu');
        }
    };
    return Preload;
}(Phaser.State));
exports["default"] = Preload;
//# sourceMappingURL=Preload.js.map