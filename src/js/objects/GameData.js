"use strict";
exports.__esModule = true;
var _ = require("lodash");
var EasyStar = require("easystarjs");
//everybody has this?
var GameState = (function () {
    function GameState(placedLoot, inventoryLoot, isReactNative) {
        this.easystar = new EasyStar.js();
        this.placedLoot = placedLoot;
        this.inventoryLoot = inventoryLoot;
        this.isReactNative = isReactNative;
    }
    GameState.prototype.placeItem = function (itemType, mission, xGrid, yGrid) {
        console.log("placing turret at: ");
        console.log(xGrid, yGrid);
        var payload = {
            type: itemType,
            x: xGrid,
            y: yGrid,
            mission: mission
        };
        this.placedLoot.push(new PlacedLootInfo(itemType, mission, xGrid, yGrid));
        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "PLACE_ITEM",
                payload: payload
            }));
        }
        var i = _.find(this.inventoryLoot, function (it) { return it.type === itemType; });
        if (i) {
            i.amount = i.amount - 1;
        }
    };
    GameState.prototype.useItem = function (itemType) {
        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "USE_ITEM",
                payload: itemType
            }));
        }
        var i = _.find(this.inventoryLoot, function (it) { return it.type === itemType.toLowerCase(); });
        if (i) {
            i.amount = i.amount - 1;
        }
    };
    GameState.prototype.markMissionAsWon = function (missionName) {
    };
    GameState.prototype.markMissionAsLost = function (missionName) {
    };
    return GameState;
}());
exports.GameState = GameState;
var LootInfo = (function () {
    function LootInfo(type, amount) {
        this.type = type;
        this.amount = amount;
    }
    return LootInfo;
}());
exports.LootInfo = LootInfo;
var PlacedLootInfo = (function () {
    function PlacedLootInfo(type, mission, x, y) {
        this.type = type;
        this.mission = mission;
        this.x = x;
        this.y = y;
    }
    return PlacedLootInfo;
}());
exports.PlacedLootInfo = PlacedLootInfo;
//# sourceMappingURL=GameData.js.map