import _ from 'lodash';
import Dao from "../dao/Dao";
import * as Phaser from "phaser-ce";
import * as WebFont from "webfontloader";

import BackgroundMusic from '../../audio/music/chiptune-dance.mp3';
import Crash1 from '../../audio/sounds/crash-1.wav';
import Crash2 from '../../audio/sounds/crash-2.wav';
import Shoot from '../../audio/sounds/shoot-9.wav';
import Button from '../../audio/sounds/button.wav';
import PlaceItem from '../../audio/sounds/points-06.mp3';
import Win from '../../audio/sounds/win.mp3';
import Lose from '../../audio/sounds/lose.mp3';

import CocktailIcon from '../../img/cocktail.png';
import GrenadeIcon from '../../img/grenade.png';
import Drone from '../../img/drone.png';
import Hack from '../../img/hack.png';
import Explosion from '../../img/explosion.png';
import Bullet from '../../img/bullet.png';
import Turret from '../../img/turret.png';
import YellowTurret from '../../img/yellow-turret.png';
import RedTurret from '../../img/red-turret.png';
import OrangeTurret from '../../img/orange-turret.png';
import GreenTurret from '../../img/green-turret.png';
import RetroBackground from '../../img/retro-background.jpg';
import SkirmishBackground from '../../img/skirmish-background.jpg';

import Joystix from '../../css/joystix-monospace.ttf';
import JoystixCss from '../../css/fonts.css';

export default class Preload extends Phaser.State {

    create() {
        this.ready = false;
        this.game.renderer.renderSession.roundPixels = true;

        Phaser.Sprite.prototype.alignInParent = function(position, offsetX, offsetY){
            if(this.parent.name == "__world")return;

            var s = this.parent.scale;
            this.parent.scale.setTo(1);
            this.alignIn(this.parent, position, offsetX, offsetY);

            this.left -= this.parent.left + (this.parent.width*this.parent.anchor.x);
            this.top -= this.parent.top + (this.parent.height*this.parent.anchor.y);

            this.parent.scale = s;
        };
    }

    preload() {

        WebFont.load({
            google: {
                families: ['Righteous']
            },
            custom: {
                families: ['Joystix'],
                urls: [JoystixCss]
            }
        });

        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.audio('backgroundMusic', [BackgroundMusic]);
        this.load.audio('crash-1', [Crash1]);
        this.load.audio('crash-2', [Crash2]);
        this.load.audio('shoot', [Shoot]);
        this.load.audio('button', [Button]);
        this.load.audio('place-item', [PlaceItem]);
        this.load.audio('win', [Win]);
        this.load.audio('lose', [Lose]);

        //new stuff
        this.game.load.image('cocktail_icon', CocktailIcon, 200, 200); //128x128
        this.game.load.image('grenade_icon', GrenadeIcon, 200, 200); //128x128
        this.game.load.spritesheet('drone', Drone, 128, 128, 3); // 128x128 with 3 frames (option param)
        this.game.load.spritesheet('hack', Hack, 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', Explosion, 86, 86);
        this.game.load.image('bullet', Bullet, 48, 48);
        this.game.load.image('turret', Turret, 64, 64);
        this.game.load.image('yellow-turret', YellowTurret, 64, 64);
        this.game.load.image('red-turret', RedTurret, 64, 64);
        this.game.load.image('orange-turret', OrangeTurret, 64, 64);
        this.game.load.image('green-turret', GreenTurret, 64, 64);
        this.game.load.image('retro-background', RetroBackground, 640, 960);
        this.game.load.image('skirmish-background', SkirmishBackground);

        this.game.physics.arcade.rotateToXY = function(sprite, x, y, offset){
          let targetAngle = (360 / (2 * Math.PI)) * this.game.math.angleBetween(sprite.x, sprite.y, x, y);

          if(targetAngle < 0)
              targetAngle += 360;

          sprite.angle = targetAngle + offset;
          return targetAngle + offset;
        };

        //TODO check the bridge for this and default to test data if not
        //TODO save this to firebase
        //access this as this.game.gameData
        this.game.gameData = {
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

    update() {

        if (this.cache.isSoundDecoded("backgroundMusic") && this.ready === false) {

            //if not react native, comment this out!
            if (typeof(window.DATA) !== "undefined") {
                this.game.gameData = window.DATA;
                this.game.gameData.isReactNative = true;
            } else {
                this.game.gameData.isReactNative = false;
            }

            let asMissionArray = _.values(this.game.gameData.placed_loot);

            let flat = _.flatMap(asMissionArray, (obj) => _.values(obj));

            this.game.gameData.inventoryItems = this.groupItems(this.game.gameData.unused_loot, this.game.gameData.caps);
            this.game.gameData.placedItems = flat;

            this.game.dao = new Dao(this.game);

            this.state.start('Menu');
        }
    }

    groupItems(items, caps) {
        if (items) {
            let byType = _.countBy(items, i => i.type);
            console.log("bytype " + JSON.stringify(byType));
            let final = _.map(Object.keys(byType), it => {
                console.log(JSON.stringify(it));
                return {type: it, amount: byType[it]}
            });
            if (caps) {
                final.push({type: 'caps', amount: caps});
            }

            return final;
        }
        else {
            return [];
        }
    }



}
