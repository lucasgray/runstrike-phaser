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
var StoryObject_1 = require("./StoryObject");
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro(options) {
        var _this = _super.call(this) || this;
        //buid caption box
        //image
        var g = options.game.add.graphics(0, 0);
        g.lineStyle(2, 0x002200, 0.5);
        g.beginFill(0x002200, 1);
        g.drawRect(0, 0, options.game.width, options.game.height); //no anchor, need to move it!
        g.endFill();
        g.inputEnabled = true;
        g.options = options;
        g.showUntil = Date.now() + options.enemy.showFor;
        //text
        g.messages = options.enemy.messages;
        g.messageIndex = 0;
        g.showLineFor = options.enemy.showFor / g.messages.length;
        var text = g.options.game.add.text(32, 380, g.messages[0], { font: "30pt Righteous", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
        g.text = text;
        g.addChild(text);
        g.update = _this.update;
        g.nextLine = _this.nextLine;
        g.updateLine = _this.updateLine;
        g.nextLine();
        return g;
    }
    Intro.prototype.update = function () {
        if (this.alive) {
            if (Date.now() >= this.showUntil) {
                this.destroy();
            }
        }
    };
    Intro.prototype.updateLine = function () {
        if (this.line.length < this.messages[this.messageIndex].length) {
            this.line = this.messages[this.messageIndex].substr(0, this.line.length + 1);
            this.text.setText(this.line);
        }
        else {
            this.options.game.time.events.add(this.showLineFor / (this.messages[this.messageIndex].length + 1), this.nextLine, this);
        }
    };
    Intro.prototype.nextLine = function () {
        this.messageIndex++;
        if (this.messageIndex < this.messages.length) {
            this.line = '';
            this.options.game.time.events.repeat(this.showLineFor / (this.messages[this.messageIndex].length + 1), this.messages[this.messageIndex].length + 1, this.updateLine, this);
        }
    };
    return Intro;
}(StoryObject_1["default"]));
exports["default"] = Intro;
//# sourceMappingURL=Intro.js.map