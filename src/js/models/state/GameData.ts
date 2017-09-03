
import * as _ from 'lodash';

//everybody has this?
export class GameState {

    //TODO more structure now that we have TS!
    placedLoot: Array<PlacedLootInfo>;
    //TODO more structure here too!
    inventoryLoot: Array<LootInfo>;

    backgroundMusic: Phaser.Sound;
    isPlayingMusic: boolean;
    hasStartedMusic: boolean;
    musicPause: boolean;

    isReactNative: boolean;

    constructor(placedLoot: Array<PlacedLootInfo>, inventoryLoot: Array<LootInfo>, isReactNative: boolean) {
        this.placedLoot = placedLoot;
        this.inventoryLoot = inventoryLoot;
        this.isReactNative = isReactNative;
    }

    placeItem(itemType, mission, row, col) {
        console.log("placing turret at: " );
        console.log(row, col);

        this.placedLoot.push(new PlacedLootInfo(itemType, mission, row, col));

        let payload = {
            type: itemType,
            x: row,
            y: col,
            mission: mission
        };

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

    unplaceItem(itemType, mission, row, col) {
        console.log('unplacing loot');

        this.placedLoot = _.remove(this.placedLoot, (x => !((x.row === row && x.col === col) && x.mission === mission)));
        //
        // if (this.isReactNative) {
        //     window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
        //         type: "UNPLACE_ITEM",
        //         payload: placed
        //     }))
        // }
        //
        let i = _.find(this.inventoryLoot, it => it.type === itemType);

        if (i) {
            i.amount = i.amount + 1;
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
    row: number;
    col: number;

    constructor(type: string, mission: string, row: number, col: number) {

        this.type = type;
        this.mission = mission;
        this.row = row;
        this.col = col;
    }
}

export class AllLoots {

    static Value = ["cocktail", "blue-turret", "green-turret", "orange-turret", "yellow-turret", "red-turret"];

    static EmptyLoots : Array<LootInfo> = AllLoots.Value.map(i => new LootInfo(i, 0));

}
