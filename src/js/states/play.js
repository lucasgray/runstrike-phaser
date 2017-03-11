import * as easystar from "easystarjs";
import _ from 'lodash';
import Buttons from "../extensions/Buttons";
import SpriteHelper from "../helpers/SpriteHelper";
import * as missions from "../missions";

export default class Play extends Phaser.State {

    preload() {
        this.game.create.grid('grid', this.game.width, this.game.height, 64, 64, '#ffffff');
        this.sprites = [];

        this.graphics = this.game.add.graphics(0, 0);
    }

    create() {
        this.mission = new missions["Defend"](this.game);
        this.game.add.sprite(0,0,'grid');

        console.log('width: ' + this.game.world.width)
        console.log('height: ' + this.game.world.height)

        this.cellWidth = this.game.world.width / 10;
        this.cellHeight = this.game.world.height / 15;

        this.bulletsGroup = this.game.add.physicsGroup();
        this.spritesGroup = this.game.add.physicsGroup();
        this.spritesGroup.enableBody = true;
        this.spritesGroup.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.stage.backgroundColor = 0x000000;

        this.setupGlobalListeners();

        this.setupGrid();

        this.drawHealth();

        this.drawInput();

        this.drawPlacedItems();

        // this.drawInventory();

        // this.drawBase();

        //??

    }

    setupGrid() {

        //10x15 grid
        let x = 10;
        let y = 15;

        //10x15 grid to make it easy.

        var easystar = new EasyStar.js();

        var grid = [];

        Array.from(new Array(y)).forEach(() => {
            grid.push(new Array(x).fill(0));
        });

        this.game.gameData.placedItems.forEach((i) => {
           grid[i.y][i.x] = 1;
        });

        easystar.setGrid(grid);
        easystar.setAcceptableTiles([0]);
        easystar.calculate();
        easystar.enableDiagonals();
        easystar.disableCornerCutting();

        this.easystar = easystar;
    }

    drawHealth() {
        //Draw rectangles for health of enemy army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(0, 0, 80, 1080);

        let w = this.game.world.width;
        let h = this.game.world.height;

        //Draw rectangles for health of player army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(w-80, 0, 80, 1080);
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

        this.btnDownSound = this.add.sound('menuDown');
        Buttons.makeButton(
            this.game,
            100,
            this.game.height - 40,
            100,
            20,
            this.btnDownSound,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

    drawPlacedItems() {
        let gameData = this.game.gameData;

        let turrets = gameData.placedItems.filter((it) => it.type === 'turret');
        let walls = gameData.placedItems.filter((it) => it.type === 'wall');

        walls.forEach((it) => this.makeWall(it.x * this.cellWidth, it.y * this.cellHeight));


        turrets.forEach((it) => this.makeTurret(it.x * this.cellWidth, it.y * this.cellHeight));

    }

    makeTurret(x, y) {

        let turret = SpriteHelper.drawTurret(this.game, x, y);

        let center = {x: x + 32, y: y + 32};

        this.turretIntervals = [];

        let shouldFireBulletCounter = 0;

        this.turretIntervals.push(setInterval(() => {

            let spriteDistances = this.sprites.map((sprite) => {
                return {
                    distance: Math.abs(sprite.x - center.x) + Math.abs(sprite.y - center.y),
                    sprite: sprite
                }
            });

            let spritesInRange = spriteDistances.filter(s => s.sprite.alive);

            let rslt = _.minBy(spritesInRange, (s) => s.distance);

            if (rslt) {

                //TODO properly figure out where that sprite was going
                let fudge = 50;

                //stolen from https://gist.github.com/jnsdbr/7f349c6a8e7f32a63f21
                let targetAngle = (360 / (2 * Math.PI)) * this.game.math.angleBetween(turret.x, turret.y, rslt.sprite.x, rslt.sprite.y+fudge);

                if(targetAngle < 0)
                    targetAngle += 360;

                //then i think it needs 90 degrees since its left/right instead of top/down
                turret.angle = targetAngle + 90;

                if (shouldFireBulletCounter > (1000 / 20) && rslt.distance <= 300) {
                    shouldFireBulletCounter = 0;
                    this.shootBulletFromTo(center.x, center.y, rslt.sprite, fudge);
                } else {
                    shouldFireBulletCounter++;
                }
            }

        }, 20));

    }

    shootBulletFromTo(x, y, sprite, fudge) {

        let bullet = this.game.add.sprite(x, y, 'bullet');
        this.game.physics.arcade.enable(bullet);
        this.bulletsGroup.add(bullet);

        this.game.physics.arcade.moveToXY(bullet, sprite.x, sprite.y+fudge, 300);
    }

    makeWall(x, y) {
        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.drawRect(x, y, 64, 64);
    }

    hackListener() {
        console.log('hack!');
        this.inputMode = 'hack';
    }

    bombListener() {
        console.log('bomb!');
        this.inputMode = 'bomb';
    }

    setupGlobalListeners() {
        this.game.input.onTap.add((pointer, doubleTap) => {
            if (this.inputMode === 'bomb') {

                let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
                explosion.anchor.setTo(.5, .5);
                let explosionAnimation = explosion.animations.add('fly');
                explosion.animations.play('fly', 30, false);

                this.spritesGroup.forEachAlive((sprite) => {

                    let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

                    //FIXME
                    //for now we just kills em
                    if (dist <= 50) {
                        this.killSprite(sprite);
                    }
                });

                explosionAnimation.onComplete.add(() => {
                    explosion.destroy();
                });
            }
        }, this);

    }

    update() {
        this.game.physics.arcade.overlap(this.bulletsGroup, this.spritesGroup, (bullet, sprite) => {
            // console.log("BULLET COLLISION!");
            if(sprite.alive){
              this.killSprite(sprite);
            }
            bullet.kill();
        }, null, this);

        this.mission.update(this.sprites, this.objects, this.easystar);
        this.easystar.calculate();
    }

    shutdown() {
        console.log("shut down called");
    }
}
