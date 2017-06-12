import _ from 'lodash';
import Dao from "../dao/Dao";

export default class Preload extends Phaser.State {

    create() {
        this.ready = false;
        this.game.renderer.renderSession.roundPixels = true;
    }

    preload() {

        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.audio('futureMusic', ['audio/music/baws-responder.ogg']);

        this.load.atlasJSONArray('button', 'img/spritesheet/button.png', 'data/spritesheet/button.json');

        this.load.spritesheet('walls', 'img/spritesheet/wall2.png', 16, 16);

        this.load.audio('menuOver', ['audio/sound/menu-over.mp3']);
        this.load.audio('menuOut', ['audio/sound/menu-out.mp3']);
        this.load.audio('menuDown', ['audio/sound/menu-click.mp3']);

        //new stuff
        this.game.load.image('cocktail_icon', 'img/cocktail.png', 200, 200); //128x128
        this.game.load.image('grenade_icon', 'img/grenade.png', 200, 200); //128x128
        this.game.load.spritesheet('drone', 'img/drone.png', 128, 128, 3); // 128x128 with 3 frames (option param)
        this.game.load.spritesheet('hack', 'img/hack.png', 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', 'img/explosion.png', 86, 86);
        this.game.load.image('bullet', 'img/orange_bullet.png', 17, 17);
        this.game.load.image('turret-top', 'img/turret-top.png', 64, 64);
        this.game.load.image('turret-bottom', 'img/turret-bottom.png', 64, 64);

        this.game.physics.arcade.rotateToXY = function(sprite, x, y, offset){
          let targetAngle = (360 / (2 * Math.PI)) * this.game.math.angleBetween(sprite.x, sprite.y, x, y);

          if(targetAngle < 0)
              targetAngle += 360;

          //then i think it needs 90 degrees since its left/right instead of top/down
          sprite.angle = targetAngle + offset;
          return sprite;
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
                        "x": 4,
                        "y": 5
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
                }
            }
        }
    }

    update() {

        //if not react native, comment this out!
        // if (typeof(window.DATA) !== "undefined") {

            // this.game.gameData = window.DATA;
            this.game.gameData.isReactNative = false;

            let asMissionArray = _.values(this.game.gameData.placed_loot);

            var flat = _.flatMap(asMissionArray, (obj) => _.values(obj));

            this.game.gameData.inventoryItems = this.groupItems(this.game.gameData.unused_loot,this.game.gameData.caps);
            this.game.gameData.placedItems = flat;

            this.game.dao = new Dao(this.game);

            this.state.start('Menu');
        // }

        // if (this.cache.isSoundDecoded("futureMusic") && this.ready === false) {
        //     console.log('decoded!');
        //     this.ready = true;
        //     this.state.start('Menu');
        // } else {
        //     console.log('not decoded yet!');
        // }
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
