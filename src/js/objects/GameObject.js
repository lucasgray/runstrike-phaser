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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        return _super.call(this) || this;
    }
    GameObject.prototype.isType = function (type) {
        return this instanceof type;
    };
    GameObject.prototype.preUpdate = function () {
    };
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.postUpdate = function () {
    };
    GameObject.prototype.addToGroup = function (groups) {
        var _this = this;
        if (groups) {
            groups.forEach(function (it) { return it.push(_this); });
        }
    };
    return GameObject;
}(PIXI.DisplayObject));
exports["default"] = GameObject;
//# sourceMappingURL=GameObject.js.map