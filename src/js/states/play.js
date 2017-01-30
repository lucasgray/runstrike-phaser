import Player from '../prefabs/player';
import Enemy from '../prefabs/enemy';
import HUD from '../prefabs/hud';

export default class Play extends Phaser.State {

    create() {
        this.game.stage.backgroundColor = 0x000000;
        this.bomb = null;
        this.hack = null;
        this.wall = null;
        this.explosion = null;
        this.sprites = [];

        this.game.input.onTap.add(this.onTap, this);
        this.graphics = this.game.add.graphics(0, 0);

        this.drawHealth();

        this.drawInput();

        // drawPlacedItems(game);

        this.drawEnemies();

        // drawInventory(game);

        // drawBase(game);

        //??

    }

    drawHealth() {
        //Draw rectangles for health of enemy army
        this.graphics.beginFill(0x00FF00);
        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.drawRect(0, 0, 80, 1080);

        let w = this.game.world.width;
        let h = this.game.world.height;

        //Draw rectangles for health of player army
        this.graphics.beginFill(0x00FF00);
        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.drawRect(w-80, 0, 80, 1080);
    }

    drawInput() {
        // var wallIcon = game.add.sprite(90, 10, 'wall_icon');
        // wallIcon.scale.setTo(1,1);
        // wallIcon.inputEnabled = true;
        // wallIcon.events.onInputDown.add(wallListener, this);

        var hackIcon = this.game.add.sprite(90, 160, 'hack_icon');
        hackIcon.scale.setTo(1, 1);
        hackIcon.inputEnabled = true;
        hackIcon.events.onInputDown.add(this.hackListener, this);

        var bombIcon = this.game.add.sprite(90, 310, 'bomb_icon');
        bombIcon.scale.setTo(1, 1);
        bombIcon.inputEnabled = true;
        bombIcon.events.onInputDown.add(this.bombListener, this);
        // var iconMask = game.make.bitmapData(128,128);
        // iconMask.circle(64,64,64);
        // iconMask.alphaMask('wall_icon');
        // var wallIcon = game.add.sprite(90, 10, iconMask);
        // wallIcon.scale.setTo(.75,.75);
    }

    drawEnemies() {

        console.log(gameData);

        let gameData = this.game.gameData;

        if (gameData.status === 'attacking') {

            gameData.shadows.forEach((shadow) => {

                console.log(shadow);

                var baddiesToMake = 0;

                if (shadow.size === 'large') {
                    baddiesToMake = 7;
                } else if (shadow.size === 'medium') {
                    baddiesToMake = 4;
                } else if (shadow.size === 'small') {
                    baddiesToMake = 2;
                }

                [...Array(baddiesToMake)].map((_, i) => {
                    console.log(i);

                    //somewhere in a 500 range
                    var offset = Math.floor(Math.random() * 500) - 250;

                    this.makeSprite(shadow.at + offset);
                });

            });

        } else {
            console.log('not implemented yet!!!');
        }
    }

    makeSprite(where) {
        var sprite = this.game.add.sprite(where, 0, 'drone');
        sprite.animations.add('fly');
        sprite.animations.play('fly', 30, true);
        sprite.scale.setTo(.5, .5);
        sprite.anchor.setTo(.5, .5);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.droneListener, this);

        this.sprites.push(sprite);
    }


    onTap(pointer, doubleTap) {
        if (this.bomb) {
            if (doubleTap) {
                console.log('doubletap');
            } else {
                console.log('tap');
            }

            let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
            explosion.anchor.setTo(.5, .5);
            let explosionAnimation = explosion.animations.add('fly');
            explosion.animations.play('fly', 30, false);

            this.sprites.forEach((sprite) => {

                let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

                //FIXME
                //for now we just kills em
                if (dist <= 50) {
                    this.hack = true;
                    this.droneListener(sprite, pointer);
                }
            });

            explosionAnimation.onComplete.add(() => {
                explosion.destroy();
            });
        }
    }

    hackListener() {
        console.log('hack!');
        this.hack = true;
    }

// function wallListener(){
//   console.log('wall!');
//   wall = true;
// }

    bombListener() {
        console.log('bomb!');
        this.bomb = true;
    }

    droneListener(sprite, f) {
        if (this.hack) {
            this.game.add.tween(sprite).to({angle: 360}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var fall = this.game.add.tween(sprite.scale).to({
                x: 0,
                y: 0
            }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
            fall.onComplete.add(() => {
                let explosion = this.game.add.sprite(sprite.x, sprite.y, 'explosion');
                explosion.anchor.setTo(.2, .2);
                explosion.scale.setTo(.2, .2);
                let explosionAnimation = explosion.animations.add('fly');
                explosion.animations.play('fly', 30, false);
                sprite.destroy();
                explosionAnimation.onComplete.add(() => {
                    explosion.destroy();
                })
            });
        }
    }

    update() {
        this.sprites.forEach((sprite) => {
            sprite.y += 1;
            if (sprite.y > this.game.height) {
                sprite.y = 0;
            }
        })
    }


}
