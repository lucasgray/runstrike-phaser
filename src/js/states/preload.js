import _ from 'lodash';
import Dao from "../dao/Dao";
import * as Phaser from "phaser-ce";

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

        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.audio('backgroundMusic', ['audio/music/chiptune-dance.mp3']);
        this.load.audio('crash-1', ['audio/sounds/crash-1.wav']);
        this.load.audio('crash-2', ['audio/sounds/crash-2.wav']);
        this.load.audio('shoot', ['audio/sounds/shoot-9.wav']);
        this.load.audio('button', ['audio/sounds/button.wav']);
        this.load.audio('place-item', ['audio/sounds/points-06.mp3']);
        this.load.audio('win', ['audio/sounds/win.mp3']);
        this.load.audio('lose', ['audio/sounds/lose.mp3']);

        //new stuff
        this.game.load.image('cocktail_icon', 'img/cocktail.png', 200, 200); //128x128
        this.game.load.image('grenade_icon', 'img/grenade.png', 200, 200); //128x128
        this.game.load.spritesheet('drone', 'img/drone.png', 128, 128, 3); // 128x128 with 3 frames (option param)
        this.game.load.spritesheet('hack', 'img/hack.png', 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', 'img/explosion.png', 86, 86);
        this.game.load.image('bullet', 'img/bullet.png', 48, 48);
        this.game.load.image('turret', 'img/turret.png', 64, 64);
        this.game.load.image('yellow-turret', 'img/yellow-turret.png', 64, 64);
        this.game.load.image('red-turret', 'img/red-turret.png', 64, 64);
        this.game.load.image('orange-turret', 'img/orange-turret.png', 64, 64);
        this.game.load.image('green-turret', 'img/green-turret.png', 64, 64);
        this.game.load.image('retro-background', 'img/retro-background.jpg', 640, 960);
        this.game.load.image('skirmish-background', 'img/skirmish-background.jpg');

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
