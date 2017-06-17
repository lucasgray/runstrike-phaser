import _ from 'lodash';

//this class is in charge of managing our game state!
//to do so, we need to update our current phaser state at game.gameData
//but also tell react-native via window.message.
//if you build a new method, make sure you handle both.

export default class Dao {

    constructor(game) {
        this.game = game;
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

        this.game.gameData.placedItems.push(payload);

        if (this.game.gameData.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "PLACE_ITEM",
                payload: payload
            }))
        }
    }

    useItem(itemType) {

        if (this.game.gameData.isReactNative) {
            window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify({
                type: "USE_ITEM",
                payload: itemType
            }))
        }

        let i = _.find(this.game.gameData.inventoryItems, it => it.type === itemType.toLowerCase());

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
