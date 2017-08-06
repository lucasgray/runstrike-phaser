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
var GameObject_1 = require("./GameObject");
var EnemyObject = (function (_super) {
    __extends(EnemyObject, _super);
    function EnemyObject() {
        return _super.call(this) || this;
    }
    return EnemyObject;
}(GameObject_1["default"]));
exports["default"] = EnemyObject;
//# sourceMappingURL=EnemyObject.js.map