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

        this.game.load.image('cocktail_icon', require('../../img/cocktail.png'));
        this.game.load.image('grenade_icon', require('../../img/grenade.png'));
        this.game.load.spritesheet('drone', require('../../img/drone-sm.png').toString(), 32, 32, 3);
        this.game.load.spritesheet('lurker', require('../../img/LurkerA.png').toString(), 16, 16, 5);
        this.game.load.spritesheet('shield', require('../../img/ShieldF.png').toString(), 16, 16, 4);
        this.game.load.spritesheet('hack', require('../../img/hack.png').toString(), 128, 128, 3);
        this.game.load.spritesheet('explosion', require('../../img/explosion.png').toString(), 86, 86);
        this.game.load.image('bullet', require('../../img/bullet.png'));
        this.game.load.image('blue-turret', require('../../img/turret.png'));
        this.game.load.image('yellow-turret', require('../../img/yellow-turret.png'));
        this.game.load.image('red-turret', require('../../img/red-turret.png'));
        this.game.load.image('orange-turret', require('../../img/orange-turret.png'));
        this.game.load.image('green-turret', require('../../img/green-turret.png'));
        this.game.load.image('retro-background', require('../../img/retro-background.jpg'));
        this.game.load.image('skirmish-background', require('../../img/skirmish-background.jpg'));

        //new
        this.game.load.image('wasteland-craters', require('../../img/wasteland-craters.png'));
        this.game.load.image('building-01', require('../../img/building-01.png'));
        this.game.load.image('base', require('../../img/base.png'));
        this.game.load.image('scanlines', require('../../img/scanlines.png'));
        this.game.load.image('screen-glare', require('../../img/screen-glare.png'));
        this.game.load.image('border-blend', require('../../img/border-blend.png'));
        this.game.load.image('grid', require('../../img/grid.png'));
        this.game.load.image('turret-base', require('../../img/turret-base.png'));
        this.game.load.image('turret-1', require('../../img/turret-1.png'));

        this.game.load.spritesheet('green-projectile', require('../../img/green-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('missile-projectile', require('../../img/missile-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('blue-projectile', require('../../img/blue-projectile.png').toString(), 32, 64, 5);
        this.game.load.spritesheet('blue-missile-projectile', require('../../img/blue-missile-projectile.png').toString(), 32, 32, 5);
        this.game.load.spritesheet('pico-icons', require('../../img/pico-icons.png').toString(), 8, 8);

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

        let placedItems = _.flatMap(asMissionArray, (obj) => _.values(obj)).map(i => new PlacedLootInfo(i['type'], i['mission'], i['x'], i['y']));


        let emptyLoot = AllLoots.EmptyLoots;
        let inventoryItems : Array<LootInfo> = this.groupItems(jsonString.unused_loot, jsonString.caps);

        let finalInventoryItems = emptyLoot.map(i => {

            let f = _.find(inventoryItems, j => j.type === i.type);

            if (f) return f;
            return i;
        });

        let missions = AllMissions.AllMissionsAndInfos(this.game);
        //TODO add mission state from react-native as well...

        return new GameState(placedItems, finalInventoryItems, missions, isReactNative);
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
                "type": "red-turret"
            }, "-Kj-ezDNFAwbZsdfsdfirmeGOH": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "blue-turret"
            }, "-Kj-ezDNFAwbZsdfsdfirmeGOI": {
                "foundBy": "TODO!",
                "foundOn": "TODO!",
                "key": "-Kj-bZwrlcIIsdfpPqnf-FQ",
                "latLong": {
                    "latitude": 43.06856735536175,
                    "longitude": -89.33985730479297
                },
                "type": "green-turret"
            }
        }
    }



}
