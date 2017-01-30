export default class Preload extends Phaser.State {

    create() {
        this.ready = false;
    }

    preload() {

        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.atlasJSONArray('smallfighter', 'img/spritesheet/smallfighter.png', 'data/spritesheet/smallfighter.json');
        this.load.atlasJSONArray('alien', 'img/spritesheet/alien.png', 'data/spritesheet/alien.json');
        this.load.atlasJSONArray('button', 'img/spritesheet/button.png', 'data/spritesheet/button.json');
        this.load.image('farback', 'img/farback.jpg');
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('particle', 'img/particle.gif');
        this.load.image('healthbar', 'img/healthbar.png');
        this.load.image('hudBg', 'img/hud-bg.png');

        this.load.audio('futureMusic', ['audio/music/2015-baws-responder.mp3']);

        this.load.audio('menuOver', ['audio/sound/menu-over.mp3']);
        this.load.audio('menuOut', ['audio/sound/menu-out.mp3']);
        this.load.audio('menuDown', ['audio/sound/menu-click.mp3']);

        this.load.audio('bulletHit', ['audio/sound/bullet-hit.mp3']);
        this.load.audio('enemyShot', ['audio/sound/enemy-shot.mp3']);
        this.load.audio('enemyExplosion', ['audio/sound/enemy-explosion.mp3']);
        this.load.audio('playerShot', ['audio/sound/player-shot.mp3']);
        this.load.audio('playerExplosion', ['audio/sound/player-explosion.mp3']);

        this.load.audio('gameOver', ['audio/sound/game-over.mp3']);

        //new stuff
        this.game.load.image('hack_icon', 'img/clock.png', 128, 128); //128x128
        this.game.load.image('bomb_icon', 'img/grenade.png', 128, 128); //128x128
        this.game.load.spritesheet('drone', 'img/drone.png', 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', 'img/explosion.png', 86, 86);


        //TODO check the bridge for this and default to test data if not
        //https://github.com/jerome-d-russ/phaser-tutorial-game/blob/lucastest/js/lucas.js
        this.game.gameData = {
            placedItems: {
                wall: {
                    x: 200, y: 200
                },
                turret: {
                    x: 300, y: 300
                }
            },
            inventoryItems: {
                bomb: 3,
                hack: 7,
                turret: 4
            },
            shadows: [
                { size: 'large', at: 450},
                { size: 'medium', at: 900},
                { size: 'small', at: 1020}
            ],
            status: 'attacking' //viewing or attacking
        };
    }

    update() {
        if (this.cache.isSoundDecoded("futureMusic") && this.ready === false) {
            console.log('decoded!');
            this.ready = true;
            this.state.start('Menu');
        } else {
            console.log('not decoded yet!');
        }
    }

}
