import * as WebFont from "webfontloader";
import {PlacedLootInfo, GameState, LootInfo, AllLoots, AllMissions} from "../models/state/GameData";
import Menu from "./Menu";
import Missions from "./Missions";
import Setup from "./Setup";
import Victory from "./Victory";
import Play from "./Play";
import Defeat from "./Defeat";
import * as _ from 'lodash';
import Debug from "./Debug";
import ArtTesting from "./ArtTesting";

require('../../css/joystix-monospace.ttf');

export default class Preload extends Phaser.State {

    create() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.time.desiredFps = 60;
    }

    preload() {

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

        this.load.audio('backgroundMusic', [require('../../audio/music/chiptune-dance.mp3')]);
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
        this.game.load.image('base', require('../../img/blue-tint/Buildings_Base.png'));
        this.game.load.image('scanlines', require('../../img/effects/scanlines.png'));
        this.game.load.image('screen-glare', require('../../img/blue-tint/FXAssets_ScreenGlare_SoftLight.jpg'));
        this.game.load.image('border-blend', require('../../img/blue-tint/FXAssets_ScreenBorder_Multiply.jpg'));
        this.game.load.image('vignette', require('../../img/blue-tint/FXAssets_Vignette_Multiply.jpg'));
        // this.game.load.image('lut', require('../../img/blue-tint/lut.png'));
        this.game.load.image('empty-grid', require('../../img/blue-tint/GridCell_empty.png'));
        this.game.load.image('unplaceable-grid', require('../../img/blue-tint/GridCell_hatchedAA.png'));
        this.game.load.image('turret-base', require('../../img/blue-tint/Turrets_TurretBase.png'));
        this.game.load.image('turret-1', require('../../img/blue-tint/Turrets_M01.png'));
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

        //old or crappy images
        this.game.load.image('cocktail_icon', require('../../img/ui/cocktail.png'));
        this.game.load.image('grenade_icon', require('../../img/deprecated/grenade.png'));
        this.game.load.spritesheet('drone', require('../../img/enemies/drone-sm.png').toString(), 32, 32, 3);
        this.game.load.spritesheet('lurker', require('../../img/enemies/LurkerA.png').toString(), 16, 16, 5);
        this.game.load.spritesheet('shield', require('../../img/enemies/ShieldF.png').toString(), 16, 16, 4);
        this.game.load.spritesheet('hack', require('../../img/deprecated/hack.png').toString(), 128, 128, 3);
        this.game.load.spritesheet('explosion', require('../../img/effects/explosion.png').toString(), 86, 86);
        this.game.load.image('bullet', require('../../img/projectiles/bullet.png'));
        this.game.load.image('blue-turret', require('../../img/turrets/deprecated/turret.png'));
        this.game.load.image('yellow-turret', require('../../img/turrets/deprecated/yellow-turret.png'));
        this.game.load.image('red-turret', require('../../img/turrets/deprecated/red-turret.png'));
        this.game.load.image('orange-turret', require('../../img/turrets/deprecated/orange-turret.png'));
        this.game.load.image('green-turret', require('../../img/turrets/deprecated/green-turret.png'));
        this.game.load.image('retro-background', require('../../img/backgrounds/retro-background.jpg'));
        this.game.load.image('skirmish-background', require('../../img/deprecated/skirmish-background.jpg'));
        this.game.load.spritesheet('green-projectile', require('../../img/projectiles/green-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('missile-projectile', require('../../img/projectiles/missile-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('blue-projectile', require('../../img/projectiles/blue-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('blue-missile-projectile', require('../../img/projectiles/blue-missile-projectile.png').toString(), 32, 32, 5);
        this.game.load.spritesheet('pico-icons', require('../../img/ui/pico-icons.png').toString(), 8, 8);
        this.game.load.image('blue-spark', require('../../img/particles/blue.png'));
        this.game.load.image('red-spark', require('../../img/particles/red.png'));

        let s  = this.makeGameData();

        this.game.state.add('Menu', new Menu(s));
        this.game.state.add('Missions', new Missions(s));
        this.game.state.add('Setup', new Setup(s));
        this.game.state.add('Play', new Play(s));
        this.game.state.add('Victory', new Victory(s));
        this.game.state.add('Defeat', new Defeat(s));
        this.game.state.add('Debug', new Debug(s));

        this.game.state.add('ArtTesting', new ArtTesting(s));
    }

    update() {

        if (this.cache.isSoundDecoded("backgroundMusic")) {
            this.state.start('Menu');
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

        let asMissionArray = _.values(jsonString.placed_loot);

        let placedItems = _.flatMap(asMissionArray, (obj) => _.values(obj)).map(i => new PlacedLootInfo(i['type'], i['x'], i['y']));


        let emptyLoot = AllLoots.EmptyLoots;
        let inventoryItems : Array<LootInfo> = this.groupItems(jsonString.unused_loot, jsonString.caps);

        let finalInventoryItems = emptyLoot.map(i => {

            let f = _.find(inventoryItems, j => j.type === i.type);

            if (f) return f;
            return i;
        });

        let missions = AllMissions.AllMissionsAndInfos(this.game);
        //TODO add mission state from react-native as well...

        let gameState = new GameState(placedItems, finalInventoryItems, missions, isReactNative);

        missions.forEach(m => m[0].gameState = gameState);

        return gameState;
    }

    groupItems(items, caps) : Array<LootInfo> {
        if (items) {
            let byType = _.countBy(items, i => i['type']);
            console.log("bytype " + JSON.stringify(byType));
            let final = _.map(Object.keys(byType), it => {
                console.log(JSON.stringify(it));
                return new LootInfo(it, byType[it]);
            });
            if (caps) {
                final.push(new LootInfo('caps', caps));
            }

            return final;
        }
        else {
            return [];
        }
    }

    fakeData: object = {
        "caps": 395,
        "placed_loot": {

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
                "type": "turret-1"
            }, "-Kj-ezDNFAwbZsdfsdfirmeGOH": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "turret-1"
            }, "-Kj-ezDNFAwbZsdfsdfirmeGOI": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "turret-1"
            }
        }
    }



}
