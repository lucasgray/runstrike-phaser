
import * as Phaser from 'phaser-ce';
import * as _ from 'lodash';
import * as EasyStar from "easystarjs";
//everybody has this?
export class GameState {

    placedLoot: Array<PlacedLootInfo>;
    inventoryLoot: Array<LootInfo>;

    backgroundMusic: Phaser.Sound;
    isPlayingMusic: boolean;

    isReactNative: boolean;

    easystar = new EasyStar.js();

    constructor(placedLoot: Array<PlacedLootInfo>, inventoryLoot: Array<LootInfo>, isReactNative: boolean) {
        this.placedLoot = placedLoot;
        this.inventoryLoot = inventoryLoot;
        this.isReactNative = isReactNative;
    }

    placeItem(itemType, mission, xGrid, yGrid) {
        console.log("placing turret at: " );
        console.log(xGrid, yGrid);

        let payload = {
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
            }))
        }

        let i = _.find(this.inventoryLoot, it => it.type === itemType);

        if (i) {
            i.amount = i.amount - 1;
        }
    }

    useItem(itemType) {

        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "USE_ITEM",
                payload: itemType
            }))
        }

        let i = _.find(this.inventoryLoot, it => it.type === itemType.toLowerCase());

        if (i) {
            i.amount = i.amount - 1;
        }
    }

    markMissionAsWon(missionName) {

    }

    markMissionAsLost(missionName) {

    }

    //more to come!
}

export class LootInfo {
    type: string;
    amount: number;

    constructor(type: string, amount: number) {
        this.type = type;
        this.amount = amount;
    }
}

export class PlacedLootInfo {

    type: string;
    mission: string;
    x: number;
    y: number;

    constructor(type: string, mission: string, x: number, y: number) {

        this.type = type;
        this.mission = mission;
        this.x = x;
        this.y = y;
    }
}
