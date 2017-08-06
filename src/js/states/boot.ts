import LoaderBar from '../../img/loader-bar.png!png';
import LoaderBg from '../../img/loader-bg.png!png';

import * as _ from 'lodash';
import * as GameData from '../objects/GameData'
import {PlacedLootInfo} from "../objects/GameData";

export default class Boot extends Phaser.State {

    gameState: GameData.GameState;

    constructor() {
        super();

        this.gameState = this.makeGameData();
    }

    preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', LoaderBg);
        this.load.image('loaderBar', LoaderBar);
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //  var x = this.calculateScreenMetrics(1920,1080);
        //  this.game.scale.setUserScale(x.scaleX, x.scaleY, x.offsetX, x.offsetY);
        //  this.game.scale.pageAlignVertically = true;
        //  this.game.scale.pageAlignHorizontally = true;
        //  this.game.scale.refresh();

        this.state.start('Preload');
    }

    calculateScreenMetrics(defaultWidth, defaultHeight, maxGameWidth, maxGameHeight) {

        var globals = {
            "screen" : {
                width: 1920,
                height: 1080,
            }
        };

        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        // Calculate the game's max dimensions. The bounds are iPad and iPhone for now.
        if (typeof maxGameWidth === "undefined" || typeof maxGameHeight === "undefined") {
            maxGameWidth = Math.round(defaultWidth * defaultWidth / defaultHeight);
            maxGameHeight = Math.round(defaultHeight * defaultWidth / defaultHeight);
        }

        // Calculate aspect ratios
        var defaultAspect = globals.screen.width / globals.screen.height,
            windowAspect = windowWidth / windowHeight,
            offsetX = 0,
            offsetY = 0,
            gameWidth = 0,
            gameHeight = 0;

        if (windowAspect > defaultAspect) {
            gameHeight = defaultHeight;
            gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
            gameWidth = Math.min(gameWidth, maxGameWidth);
            offsetX = (gameWidth - defaultWidth) / 2;
            offsetY = 0;
        } else {
            gameWidth = defaultWidth;
            gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
            gameHeight = Math.min(gameHeight, maxGameHeight);
            offsetX = 0;
            offsetY = (gameHeight - defaultHeight) / 2;
        }

        // calculate scale
        var scaleX = windowWidth / gameWidth,
            scaleY = windowHeight / gameHeight;

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

    }

    makeGameData() : GameData.GameState {
        //TODO check the bridge for this and default to test data if not
        //TODO save this to firebase
        //access this as this.game.gameData

        let jsonString;
        let isReactNative;
        //if not react native, comment this out!
        if (typeof(window.DATA) !== "undefined") {
            jsonString = window.DATA;
            isReactNative = true;
        } else {
            jsonString = this.fakeData;
            isReactNative = false;
        }

        let asMissionArray = _.values(jsonString.placed_loot);

        let placedItems = _.flatMap(asMissionArray, (obj) => _.values(obj)).map(i => new PlacedLootInfo(i.type, i.mission, i.x, i.y));
        let inventoryItems = this.groupItems(jsonString.unused_loot, jsonString.caps);

        return new GameData.GameState(placedItems, inventoryItems, isReactNative);
    }

    groupItems(items, caps) {
        if (items) {
            let byType = _.countBy(items, i => i.type);
            console.log("bytype " + JSON.stringify(byType));
            let final = _.map(Object.keys(byType), it => {
                console.log(JSON.stringify(it));
                return new GameData.LootInfo(it, byType[it]);
            });
            if (caps) {
                final.push(new GameData.LootInfo('caps', caps));
            }

            return final;
        }
        else {
            return [];
        }
    }

    fakeData :object  = {
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
            },"-Kj-ezDNFAwbZsdfsdfirmeGOE": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "cocktail"
            },"-Kj-ezDNFAwbZsdfsdfirmeGOG": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "Turret"
            },"-Kj-ezDNFAwbZsdfsdfirmeGOH": {
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
    }

}
