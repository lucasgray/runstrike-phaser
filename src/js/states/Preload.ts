import * as WebFont from "webfontloader";
import {PlacedDefenseItemInfo, GameState, DefenseItemInfo, AllLoots} from "../models/state/GameData";
import Menu from "./Menu";
import Missions from "./Missions";
import Setup from "./Setup";
import Victory from "./Victory";
import Play from "./Play";
import Defeat from "./Defeat";
import * as _ from 'lodash';
import Debug from "./Debug";
import LargeSkirmish from "../missions/LargeSkirmish";

require('../../css/joystix-monospace.ttf');

export default class Preload extends Phaser.State {

    gameState: GameState;
    foundGameState: boolean = false;

    preload() {
        this.game.renderer.renderSession.roundPixels = false;
        this.game.time.desiredFps = 60;

        WebFont.load({
            google: {
                families: ['Righteous']
            },
            custom: {
                families: ['Joystix'],
                urls: [require('../../css/fonts.css')]
            }
        });

        let loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        let loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        loaderBg.anchor.setTo(0.5);
        loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(loaderBar);

        // this.load.audio('backgroundMusic', [require('../../audio/music/chiptune-dance.mp3')]);
        this.load.audio('crash-1', [require('../../audio/sounds/crash-1.wav')]);
        this.load.audio('crash-2', [require('../../audio/sounds/crash-2.wav')]);
        this.load.audio('shoot', [require('../../audio/sounds/shoot-9.wav')]);
        this.load.audio('button', [require('../../audio/sounds/button.wav')]);
        this.load.audio('place-item', [require('../../audio/sounds/points-06.mp3')]);
        this.load.audio('wrong-choice', [require('../../audio/sounds/wrong-choice.wav')]);
        this.load.audio('win', [require('../../audio/sounds/win.mp3')]);
        this.load.audio('lose', [require('../../audio/sounds/lose.mp3')]);

        //new and blue tint images
        this.game.load.image('wasteland-craters', require('../../img/blue-tint/Buildings_Floor_WastelandCraters.jpg'));
        this.game.load.image('building-01', require('../../img/blue-tint/Buildings_Building001.png'));
        this.game.load.image('building-02', require('../../img/blue-tint/Buildings_Building002.png'));
        this.game.load.image('building-03', require('../../img/blue-tint/Buildings_Building003.png'));
        this.game.load.image('building-04', require('../../img/blue-tint/Buildings_Building004.png'));
        this.game.load.image('building-05', require('../../img/blue-tint/Buildings_Building005.png'));
        this.game.load.image('building-06', require('../../img/blue-tint/Buildings_Building006.png'));
        this.game.load.image('base', require('../../img/blue-tint/Buildings_Base.png'));
        this.game.load.image('scanlines', require('../../img/effects/scanlines.png'));
        this.game.load.image('screen-glare', require('../../img/blue-tint/FXAssets_ScreenGlare_SoftLight.jpg'));
        this.game.load.image('border-blend', require('../../img/blue-tint/FXAssets_ScreenBorder_Multiply.jpg'));
        this.game.load.image('vignette', require('../../img/blue-tint/FXAssets_Vignette_Multiply.jpg'));
        // this.game.load.image('lut', require('../../img/blue-tint/lut.png'));
        this.game.load.image('empty-grid', require('../../img/blue-tint/GridCell_empty.png'));
        this.game.load.image('unplaceable-grid', require('../../img/blue-tint/GridCell_hatchedAA.png'));
        this.game.load.image('turret-base', require('../../img/blue-tint/Turrets_TurretBase.png'));
        this.game.load.image('auto_turret', require('../../img/blue-tint/Turrets_M01.png'));
        this.game.load.image('turret-heavy', require('../../img/blue-tint/Turrets_H01.png'));
        this.game.load.image('auto-turret-ui', require('../../img/blue-tint/UIAssets_Button_TowerAutocannon001.png'));
        this.game.load.image('heavy-turret-ui', require('../../img/blue-tint/UIAssets_Button_TowerHeavy001.png'));
        this.game.load.image('debris-01', require('../../img/blue-tint/Debris_001.png'));
        this.game.load.image('debris-02', require('../../img/blue-tint/Debris_002.png'));
        this.game.load.image('debris-03', require('../../img/blue-tint/Debris_003.png'));
        this.game.load.image('ship-01', require('../../img/blue-tint/Enemies_Enemy001.png'));
        this.game.load.image('ship-02', require('../../img/blue-tint/Enemies_Enemy002.png'));
        this.game.load.image('ship-03', require('../../img/blue-tint/Enemies_Enemy003.png'));
        this.game.load.image('aa-shot-01', require('../../img/blue-tint/WeaponFX_Shot01.png'));
        this.game.load.spritesheet('weapon-muzzleflash', require('../../img/blue-tint/WeaponFx_MuzzleFlashFull01.png').toString(), 65, 64, 3);
        this.game.load.spritesheet('weapon-explosion-sm', require('../../img/blue-tint/WeaponFx_ExplosionSmFull01.png').toString(), 65, 65, 5);
        this.game.load.image('explosion-flare', require('../../img/blue-tint/ExplosionLGFX_Flare001.png'));
        this.game.load.image('explosion-shockwave', require('../../img/blue-tint/ExplosionLGFX_Shockwave001.png'));
        this.game.load.image('ui-inactive', require('../../img/blue-tint/UIAssets_FrameG9.png'));
        this.game.load.image('ui-active', require('../../img/blue-tint/UIAssets_ButtonG9.png'));
        this.game.load.image('ui-rocket-inactive', require('../../img/blue-tint/UIAssets_Button_Rocket_Inactive.png'));
        this.game.load.image('ui-rocket-active', require('../../img/blue-tint/UIAssets_Button_Rocket_Active.png'));
        this.game.load.image('ui-wrench-inactive', require('../../img/blue-tint/UIAssets_Button_Wrench_Inactive.png'));
        this.game.load.image('ui-wrench-active', require('../../img/blue-tint/UIAssets_Button_Wrench_Active.png'));
    }

    /**
     * When the load is finished the create function is called
     */
    create() {
        if (!this.foundGameState) {
            this.gameState = this.makeGameData();
        }

        this.game.state.add('Menu', new Menu(this.gameState));
        this.game.state.add('Missions', new Missions(this.gameState));
        this.game.state.add('Setup', new Setup(this.gameState));
        this.game.state.add('Play', new Play(this.gameState));
        this.game.state.add('Victory', new Victory(this.gameState));
        this.game.state.add('Defeat', new Defeat(this.gameState));
        this.game.state.add('Debug', new Debug(this.gameState));

        if (this.gameState.activityRequested) {

            let largeSkirmish = new LargeSkirmish(this.game, this.gameState.wave);
            largeSkirmish.setGameState(this.gameState);

            if (this.gameState.activityRequested === 'setup') {
                this.game.state.start('Setup', true, false, largeSkirmish);
            } else {
                this.game.state.start('Play', true, false, largeSkirmish);
            }
        }
    }

    //keep trying to find game state until load is finished......
    update() {
        if (typeof(window.DATA) !== "undefined" && !this.foundGameState) {
            this.foundGameState = true;
            this.gameState = this.makeGameData();
        }
    }

    makeGameData(): GameState {

        let jsonString;
        let isReactNative;

        if (typeof(window.DATA) !== "undefined") {
            jsonString = window.DATA;
            isReactNative = true;
        } else {
            jsonString = this.fakeData;
            isReactNative = false;
        }

        let placedItems = jsonString.missionSequence.placed_defenses.map(
            i => new PlacedDefenseItemInfo(i['type'], i['row'], i['col'], i['health']));

        let emptyLoot = AllLoots.EmptyLoots;
        let inventoryItems: Array<DefenseItemInfo> = jsonString.missionSequence.unused_defenses.map(
            ud => new DefenseItemInfo(ud.type, ud.amount));

        let finalInventoryItems = emptyLoot.map(i => {

            let f = _.find(inventoryItems, j => j.type === i.type);

            if (f) return f;
            return i;
        });

        let activityRequested = jsonString.action;
        let wave = jsonString.wave;

        return new GameState(placedItems, finalInventoryItems, isReactNative, activityRequested, wave);
    }

    fakeData: object = {
        "missionSequence": {
            "days_between": 4,
            "mission_sequence_identifier": 0,
            "sequence_number": 0,
            "score": {
                "total": 150922,
                "1519586206014": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 5783
                    }, {"reason": "distance", "amount": 4310}, {"reason": "supplies gathered", "amount": 8000}],
                    "reason": "run",
                    "amount": 23093
                },
                "1519586169915": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 5783
                    }, {"reason": "distance", "amount": 4310}, {
                        "reason": "intel found",
                        "amount": 5000
                    }, {"reason": "supplies scouted", "amount": 4500}], "reason": "run", "amount": 24593
                },
                "1519586137987": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 5783
                    }, {"reason": "distance", "amount": 4310}, {
                        "reason": "intel found",
                        "amount": 5000
                    }, {"reason": "supplies scouted", "amount": 6000}], "reason": "run", "amount": 26093
                },
                "1519586067087": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 5783
                    }, {"reason": "distance", "amount": 4310}], "reason": "run", "amount": 15093
                },
                "1519586122404": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 5783
                    }, {"reason": "distance", "amount": 4310}, {
                        "reason": "intel found",
                        "amount": 5000
                    }, {"reason": "supplies scouted", "amount": 5500}], "reason": "run", "amount": 25593
                },
                "1519503203920": {
                    "bonusMultipliers": [{"reason": "base", "amount": 5000}, {
                        "reason": "pace",
                        "amount": 3617
                    }, {"reason": "distance", "amount": 7330}, {
                        "reason": "intel found",
                        "amount": 9000
                    }, {"reason": "supplies scouted", "amount": 11500}], "reason": "run", "amount": 36447
                }
            },
            "next_wave": {"enemies": {"enemy001": 1}, "due_at": 1519834300538, "assigned_at": 1519488700538},
            "previous_waves": {},
            "next_challenge": {"due_at": 1519834300538, "assigned_at": 1519488700538},
            "previous_challenges": {},
            "supplies": [{"type": "supplies", "amount": 10}, {"type": "chemicals", "amount": 3}, {
                "type": "salvage",
                "amount": 6
            }, {"type": "plastics", "amount": 2}, {"type": "electronics", "amount": 1}, {
                "type": "intel",
                "amount": 24
            }],
            "unused_defenses": [{"type": "rocket", "amount": 2}, {
                "type": "wrench",
                "amount": 1
            }, {"type": "auto_turret", "amount": 1}],
            "placed_defenses":
                [
                    {"row": 5, "type": "auto_turret", "col": 6, "health": 128},
                    {"row": 6, "type": "auto_turret", "col": 6, "health": 748},
                    {"row": 7, "type": "auto_turret", "col": 6, "health": 847},
                    {"row": 5, "type": "auto_turret", "col": 8, "health": 1000},
                    {"row": 6, "type": "auto_turret", "col": 8, "health": 1000},
                    {"row": 7, "type": "auto_turret", "col": 8, "health": 1000}
                ]
            ,
            "intel": 24
        },
        "action": "setup",
        "wave": [
            { type: 'ShipOne', delay: 1000, size: 'large', at: 1},
            { type: 'ShipOne', delay: 0, size: 'large', at: 3},
            { type: 'ShipOne', delay: 0, size: 'large', at: 5},
            { type: 'ShipOne', delay: 7000, size: 'large', at: 1},
            { type: 'ShipOne', delay: 0, size: 'large', at: 3},
            { type: 'ShipOne', delay: 0, size: 'large', at: 5},
            { type: 'ShipOne', delay: 7000, size: 'large', at: 1},
            { type: 'ShipOne', delay: 0, size: 'large', at: 3},
            { type: 'ShipOne', delay: 0, size: 'large', at: 5},
        ]
    }


}
