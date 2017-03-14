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

        this.load.audio('futureMusic', ['audio/music/baws-responder.ogg']);

        this.load.atlasJSONArray('button', 'img/spritesheet/button.png', 'data/spritesheet/button.json');

        this.load.spritesheet('walls', 'img/spritesheet/wall2.png', 16, 16);

        this.load.audio('menuOver', ['audio/sound/menu-over.mp3']);
        this.load.audio('menuOut', ['audio/sound/menu-out.mp3']);
        this.load.audio('menuDown', ['audio/sound/menu-click.mp3']);

        //new stuff
        this.game.load.image('hack_icon', 'img/clock.png', 128, 128); //128x128
        this.game.load.image('bomb_icon', 'img/grenade.png', 128, 128); //128x128
        this.game.load.spritesheet('drone', 'img/drone.png', 128, 128, 3); // 128x128 with 3 frames (option param)
        this.game.load.spritesheet('hack', 'img/hack.png', 128, 128, 3); // 128x128 with 2 frames (option param)
        this.game.load.spritesheet('explosion', 'img/explosion.png', 86, 86);
        this.game.load.image('bullet', 'img/orange_bullet.png', 17, 17);
        this.game.load.image('turret-top', 'img/turret-top.png', 64, 64);
        this.game.load.image('turret-bottom', 'img/turret-bottom.png', 64, 64);

        //TODO check the bridge for this and default to test data if not
        //TODO save this to firebase
        //access this as this.game.gameData
        this.game.gameData = {

            //where on our 10x15 grid?
            placedItems: [
                // {
                //     type: 'wall',
                //     x: 2, y: 3
                // },
                // etc.
            ],
            inventoryItems: {
                bomb: 3,
                hack: 7,
                turret: 4
            },
            shadows: [
                { size: 'large', at: 100},
                { size: 'medium', at: 400},
                { size: 'small', at: 500}
            ],
            status: 'attacking' //viewing or attacking
        };
    }

    update() {
        // if (this.cache.isSoundDecoded("futureMusic") && this.ready === false) {
        //     console.log('decoded!');
            this.ready = true;
            this.state.start('Menu');
        // } else {
        //     console.log('not decoded yet!');
        // }
    }

}
