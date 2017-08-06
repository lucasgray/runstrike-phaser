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
var loader_bar_png_png_1 = require("../../img/loader-bar.png!png");
var loader_bg_png_png_1 = require("../../img/loader-bg.png!png");
var _ = require("lodash");
var GameData = require("../objects/GameData");
var GameData_1 = require("../objects/GameData");
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
        this.load.image('loaderBg', loader_bg_png_png_1["default"]);
        this.load.image('loaderBar', loader_bar_png_png_1["default"]);
    };
    Boot.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //  var x = this.calculateScreenMetrics(1920,1080);
        //  this.game.scale.setUserScale(x.scaleX, x.scaleY, x.offsetX, x.offsetY);
        //  this.game.scale.pageAlignVertically = true;
        //  this.game.scale.pageAlignHorizontally = true;
        //  this.game.scale.refresh();
        this.state.start('Preload');
    };
    Boot.prototype.calculateScreenMetrics = function (defaultWidth, defaultHeight, maxGameWidth, maxGameHeight) {
        var globals = {
            "screen": {
                width: 1920,
                height: 1080
            }
        };
        var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
        // Calculate the game's max dimensions. The bounds are iPad and iPhone for now.
        if (typeof maxGameWidth === "undefined" || typeof maxGameHeight === "undefined") {
            maxGameWidth = Math.round(defaultWidth * defaultWidth / defaultHeight);
            maxGameHeight = Math.round(defaultHeight * defaultWidth / defaultHeight);
        }
        // Calculate aspect ratios
        var defaultAspect = globals.screen.width / globals.screen.height, windowAspect = windowWidth / windowHeight, offsetX = 0, offsetY = 0, gameWidth = 0, gameHeight = 0;
        if (windowAspect > defaultAspect) {
            gameHeight = defaultHeight;
            gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
            gameWidth = Math.min(gameWidth, maxGameWidth);
            offsetX = (gameWidth - defaultWidth) / 2;
            offsetY = 0;
        }
        else {
            gameWidth = defaultWidth;
            gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
            gameHeight = Math.min(gameHeight, maxGameHeight);
            offsetX = 0;
            offsetY = (gameHeight - defaultHeight) / 2;
        }
        // calculate scale
        var scaleX = windowWidth / gameWidth, scaleY = windowHeight / gameHeight;
        return {
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            defaultGameWidth: defaultWidth,
            defaultGameHeight: defaultHeight,
            maxGameWidth: maxGameWidth,
            maxGameHeight: maxGameHeight,
            gameWidth: gameWidth,
            gameHeight: gameHeight,
            scaleX: scaleX,
            scaleY: scaleY,
            offsetX: offsetX,
            offsetY: offsetY
        };
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