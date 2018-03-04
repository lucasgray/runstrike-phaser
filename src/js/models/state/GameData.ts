
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

    placedItems: Array<PlacedDefenseItemInfo>;
    inventoryItems: Array<DefenseItemInfo>;

    isReactNative: boolean;
    activityRequested: string;

    wave: Array<object>;

    constructor(placedLoot: Array<PlacedDefenseItemInfo>, inventoryLoot: Array<DefenseItemInfo>, isReactNative: boolean, activityRequested: string, wave: Array<object>) {
        this.placedItems = placedLoot;
        this.inventoryItems = inventoryLoot;
        this.isReactNative = isReactNative;
        this.activityRequested = activityRequested;
        this.wave = wave;
    }

    placeItem(itemType, row, col) {

        console.log("placing turret at: " );
        console.log(row, col);

        let exists = _.some(this.placedItems, (pl) => pl.type === itemType && pl.row === row && pl.col === col);
        if (exists) return;

        this.placedItems.push(new PlacedDefenseItemInfo(itemType, row, col));

        let i = _.find(this.inventoryItems, it => it.type === itemType);

        if (i) {
            i.amount = i.amount - 1;
        }
    }

    unplaceItem(itemType, mission, row, col) {
        console.log('unplacing loot');

        let found = false;
        this.placedItems.forEach((pl, i) => {
            if (pl.row === row && pl.col === col) {
                found = true;
                this.placedItems.splice(i, 1);
            }
        });

        if (found) {
            let i = _.find(this.inventoryItems, it => it.type === itemType);

            if (i) {
                i.amount = i.amount + 1;
            }
        }
    }

    useItem(itemType) {

        let i = _.find(this.inventoryItems, it => it.type === itemType.toLowerCase());

        if (i) {
            i.amount = i.amount - 1;
        }
    }

    beginVictorySequence(game: Phaser.Game, mission: Mission) {

        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "MISSION_WON",
                payload: JSON.stringify({
                    placed_defenses: this.placedItems,
                    unused_defenses: this.inventoryItems,
                    baseHealth: mission.currentBase.health,
                    turretHealth: mission.turrets.all().map(t => {
                        return {row: t.row, col: t.col, health: t.health / t.maxHealth}
                    })
                })
            }))
        } else {
            game.state.start('Victory', true, false, mission);
        }
    }

    beginDefeatSequence(game: Phaser.Game, mission: Mission) {
        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "MISSION_LOST",
                payload: JSON.stringify({
                    placed_defenses: this.placedItems,
                    unused_defenses: this.inventoryItems,
                    baseHealth: mission.currentBase.health,
                    turretHealth: mission.turrets.all().map(t => {
                        return {row: t.row, col: t.col, health: t.health / t.maxHealth}
                    })
                })
            }))
        } else {
            game.state.start('Defeat', true, false, mission);
        }
    }

    finishSetup(game: Phaser.Game, mission: Mission) {
        if (this.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "SETUP_FINISHED",
                payload: {
                    placed_defenses: this.placedItems,
                    unused_defenses: this.inventoryItems
                }
            }));
        } else {
            game.state.start('Play', true, false, mission);
        }
    }

    //more to come!
}

export class DefenseItemInfo {
    type: string;
    amount: number;

    constructor(type: string, amount: number) {
        this.type = type;
        this.amount = amount;
    }
}

export class PlacedDefenseItemInfo {

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

    static Value = ["rocket", "auto_turret", "wrench"];

    static EmptyLoots : Array<DefenseItemInfo> = AllLoots.Value.map(i => new DefenseItemInfo(i, 0));

}

// export class MissionInfo {
//
//     failedAttempts: number;
//     beat: boolean;
//
//     constructor(failedAttempts: number, beat: boolean) {
//         this.failedAttempts = failedAttempts;
//         this.beat = beat;
//     }
// }
//
// export class AllMissions {
//
//     private static AllMissions(game: Phaser.Game) : Array<Mission> {
//         return [
//             new SmallSkirmish(game),
//             new LargeSkirmish(game),
//             new StoryOne(game),
//             new StoryTwo(game),
//             new StoryThree(game),
//             new BossOne(game)
//         ];
//     }
//
//     static AllMissionsAndInfos(game: Phaser.Game) : Array<[Mission, MissionInfo]> {
//
//         let missions = AllMissions.AllMissions(game);
//
//         let m = missions.map(m => {
//             let m1 : [Mission, MissionInfo] = [m, new MissionInfo(0, false)];
//
//             return m1;
//         });
//
//         return m;
//     }
//
// }
