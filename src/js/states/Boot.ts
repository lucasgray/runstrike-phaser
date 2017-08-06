import * as _ from 'lodash';
import * as GameData from '../objects/GameData'
import {PlacedLootInfo} from "../objects/GameData";
import Preload from "./Preload";
import Menu from "./Menu";

export default class Boot extends Phaser.State {

    gameState: GameData.GameState;

    constructor() {
        super();

        this.gameState = this.makeGameData();
    }

    preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', require('../../img/loader-bg.png'));
        this.load.image('loaderBar', require('../../img/loader-bar.png'));
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.game.state.add('Preload', new Preload());
        this.game.state.add('Menu', new Menu(this.gameState));

        this.state.start('Preload');
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
