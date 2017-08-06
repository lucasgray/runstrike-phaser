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
var Caption = (function (_super) {
    __extends(Caption, _super);
    function Caption(game, x, y, groups) {
        return _super.call(this) || this;
        //buid caption
        //image? y/n
        //text
    }
    Caption.prototype.update = function () {
        //do the write out like the RN piece?
    };
    return Caption;
}(StoryObject_1["default"]));
exports["default"] = Caption;
//# sourceMappingURL=Caption.js.map