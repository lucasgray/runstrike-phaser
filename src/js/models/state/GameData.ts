
import * as _ from 'lodash';
import Mission from "../../missions/Mission";

//everybody has this?
export class GameState {

    //TODO more structure now that we have TS!
    placedLoot: Array<PlacedLootInfo>;
    //TODO more structure here too!
    inventoryLoot: Array<LootInfo>;

    missionInfo: Array<MissionInfo>;

    backgroundMusic: Phaser.Sound;
    isPlayingMusic: boolean;
    hasStartedMusic: boolean;
    musicPause: boolean;

    isReactNative: boolean;

    constructor(placedLoot: Array<PlacedLootInfo>, inventoryLoot: Array<LootInfo>, missionInfo: Array<MissionInfo>, isReactNative: boolean) {
        this.placedLoot = placedLoot;
        this.inventoryLoot = inventoryLoot;
        this.missionInfo = missionInfo;
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

    markMissionAsWon(mission: Mission) {
        let i = _.find(this.missionInfo, i => i.name === mission.name);
        i.beat = true;

        //TODO react native
    }

    markMissionAsLost(mission: Mission) {
        let i = _.find(this.missionInfo, i => i.name === mission.name);
        i.failedAttempts = i.failedAttempts + 1;

        //TODO react native
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

export class MissionInfo {

    name: string;
    failedAttempts: number;
    beat: boolean;

    constructor(name: string, failedAttempts: number, beat: boolean) {
        this.name = name;
        this.failedAttempts = failedAttempts;
        this.beat = beat;
    }
}

export class AllMissions {

    static Value = ["small-skirmish", "large-skirmish", "story-one", "story-two", "story-three", "boss-one"];

    static BaseMissions : Array<MissionInfo> = AllMissions.Value.map(i => new MissionInfo(i, 0, false));
}
