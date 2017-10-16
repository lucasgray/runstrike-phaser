
import * as _ from 'lodash';
import Mission from "../../missions/Mission";
import SmallSkirmish from "../../missions/SmallSkirmish";
import LargeSkirmish from "../../missions/LargeSkirmish";
import StoryOne from "../../missions/StoryOne";
import StoryTwo from "../../missions/StoryTwo";
import StoryThree from "../../missions/StoryThree";
import BossOne from "../../missions/BossOne";

//everybody has this?
export class GameState {

    placedLoot: Array<PlacedLootInfo>;
    inventoryLoot: Array<LootInfo>;

    missionInfo: Array<[Mission, MissionInfo]>;

    backgroundMusic: Phaser.Sound;
    isPlayingMusic: boolean;
    hasStartedMusic: boolean;
    musicPause: boolean;

    isReactNative: boolean;

    constructor(placedLoot: Array<PlacedLootInfo>, inventoryLoot: Array<LootInfo>, missionInfo: Array<[Mission, MissionInfo]>, isReactNative: boolean) {
        this.placedLoot = placedLoot;
        this.inventoryLoot = inventoryLoot;
        this.missionInfo = missionInfo;
        this.isReactNative = isReactNative;
    }

    placeItem(itemType, row, col) {

        console.log("placing turret at: " );
        console.log(row, col);

        let exists = _.some(this.placedLoot, (pl) => pl.type === itemType && pl.row === row && pl.col === col);
        if (exists) return;

        this.placedLoot.push(new PlacedLootInfo(itemType, row, col));

        let payload = {
            type: itemType,
            x: row,
            y: col
        };

        // if (this.isReactNative) {
        //     window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
        //         type: "PLACE_ITEM",
        //         payload: payload
        //     }))
        // }

        let i = _.find(this.inventoryLoot, it => it.type === itemType);

        if (i) {
            i.amount = i.amount - 1;
        }
    }

    unplaceItem(itemType, mission, row, col) {
        console.log('unplacing loot');

        let found = false;
        this.placedLoot.forEach((pl, i) => {
            if (pl.row === row && pl.col === col) {
                found = true;
                this.placedLoot.splice(i, 1);
            }
        });

        //
        // if (this.isReactNative) {
        //     window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
        //         type: "UNPLACE_ITEM",
        //         payload: placed
        //     }))
        // }
        //

        if (found) {
            let i = _.find(this.inventoryLoot, it => it.type === itemType);

            if (i) {
                i.amount = i.amount + 1;
            }
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
        let i = _.find(this.missionInfo, i => i[0].name === mission.name);

        if (i == null) return;

        i[1].beat = true;

        //TODO react native
    }

    markMissionAsLost(mission: Mission) {
        let i = _.find(this.missionInfo, i => i[0].name === mission.name);

        if (i == null) return;

        i[1].failedAttempts = i[1].failedAttempts + 1;

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
    row: number;
    col: number;

    constructor(type: string, row: number, col: number) {

        this.type = type;
        this.row = row;
        this.col = col;
    }
}

export class AllLoots {

    static Value = ["cocktail", "turret-1"];

    static EmptyLoots : Array<LootInfo> = AllLoots.Value.map(i => new LootInfo(i, 0));

}

export class MissionInfo {

    failedAttempts: number;
    beat: boolean;

    constructor(failedAttempts: number, beat: boolean) {
        this.failedAttempts = failedAttempts;
        this.beat = beat;
    }
}

export class AllMissions {

    private static AllMissions(game: Phaser.Game) : Array<Mission> {
        return [
            new SmallSkirmish(game),
            new LargeSkirmish(game),
            new StoryOne(game),
            new StoryTwo(game),
            new StoryThree(game),
            new BossOne(game)
        ];
    }

    static AllMissionsAndInfos(game: Phaser.Game) : Array<[Mission, MissionInfo]> {

        let missions = AllMissions.AllMissions(game);

        let m = missions.map(m => {
            let m1 : [Mission, MissionInfo] = [m, new MissionInfo(0, false)];

            return m1;
        });

        return m;
    }

}
