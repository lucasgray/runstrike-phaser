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
var _ = require("lodash");
var GameData = require("../objects/GameData");
var GameData_1 = require("../objects/GameData");
var Preload_1 = require("./Preload");
var Menu_1 = require("./Menu");
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        var _this = _super.call(this) || this;
        _this.fakeData = {
            "caps": 395,
            "placed_loot": {
                "Skirmish": {
                    "-KivEivrunTm0bGxrfPq": {
                        "mission": "Skirmish",
                        "type": "Turret",
                        "x": 3,
                        "y": 5
                    },
                    "-Kj57wIvhvgeQG7Xdz3X": {
                        "mission": "Skirmish",
                        "type": "Turret",
                        "x": 8,
                        "y": 10
                    }
                }
            },
            "unused_loot": {
                "-Kj-ezDNFAwbZirmeGOE": {
                    "foundBy": "TODO!",
                    "foundOn": "TODO!",
                    "key": "-Kj-bZwrlcIIpPqnf-FQ",
                    "latLong": {
                        "latitude": 43.06856735536175,
                        "longitude": -89.33985730479297
                    },
                    "type": "cocktail"
                },
                "-Kj-ezDsdfNFAwbZirmeGOE": {
                    "foundBy": "TODO!",
                    "foundOn": "TODO!",
                    "key": "-Kj-bZwrlcIIpPsdfqnf-FQ",
                    "latLong": {
                        "latitude": 43.06856735536175,
                        "longitude": -89.33985730479297
                    },
                    "type": "cocktail"
                }, "-Kj-ezDNFAwbZsdfsdfirmeGOE": {
                    "foundBy": "TODO!",
                    "foundOn": "TODO!",
                    "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                    "latLong": {
                        "latitude": 43.06856735536175,
                        "longitude": -89.33985730479297
                    },
                    "type": "cocktail"
                }, "-Kj-ezDNFAwbZsdfsdfirmeGOG": {
                    "foundBy": "TODO!",
                    "foundOn": "TODO!",
                    "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                    "latLong": {
                        "latitude": 43.06856735536175,
                        "longitude": -89.33985730479297
                    },
                    "type": "Turret"
                }, "-Kj-ezDNFAwbZsdfsdfirmeGOH": {
                    "foundBy": "TODO!",
                    "foundOn": "TODO!",
                    "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                    "latLong": {
                        "latitude": 43.06856735536175,
                        "longitude": -89.33985730479297
                    },
                    "type": "Turret"
                }
            }
        };
        _this.gameState = _this.makeGameData();
        return _this;
    }
    Boot.prototype.preload = function () {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', require('../../img/loader-bg.png'));
        this.load.image('loaderBar', require('../../img/loader-bar.png'));
    };
    Boot.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.state.add('Preload', new Preload_1["default"]());
        this.game.state.add('Menu', new Menu_1["default"](this.gameState));
        this.state.start('Preload');
    };
    Boot.prototype.makeGameData = function () {
        //TODO check the bridge for this and default to test data if not
        //TODO save this to firebase
        //access this as this.game.gameData
        var jsonString;
        var isReactNative;
        //if not react native, comment this out!
        if (typeof (window.DATA) !== "undefined") {
            jsonString = window.DATA;
            isReactNative = true;
        }
        else {
            jsonString = this.fakeData;
            isReactNative = false;
        }
        var asMissionArray = _.values(jsonString.placed_loot);
        var placedItems = _.flatMap(asMissionArray, function (obj) { return _.values(obj); }).map(function (i) { return new GameData_1.PlacedLootInfo(i.type, i.mission, i.x, i.y); });
        var inventoryItems = this.groupItems(jsonString.unused_loot, jsonString.caps);
        return new GameData.GameState(placedItems, inventoryItems, isReactNative);
    };
    Boot.prototype.groupItems = function (items, caps) {
        if (items) {
            var byType_1 = _.countBy(items, function (i) { return i.type; });
            console.log("bytype " + JSON.stringify(byType_1));
            var final = _.map(Object.keys(byType_1), function (it) {
                console.log(JSON.stringify(it));
                return new GameData.LootInfo(it, byType_1[it]);
            });
            if (caps) {
                final.push(new GameData.LootInfo('caps', caps));
            }
            return final;
        }
        else {
            return [];
        }
    };
    return Boot;
}(Phaser.State));
exports["default"] = Boot;
//# sourceMappingURL=Boot.js.map