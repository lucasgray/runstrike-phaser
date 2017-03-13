import * as easystar from "easystarjs";
import _ from 'lodash';
import Buttons from "../extensions/Buttons";
import SpriteHelper from "../helpers/SpriteHelper";
import * as gameObjects from "../objects";
import * as missions from "../missions";

export default class Play extends Phaser.State {

    preload() {
        this.game.create.grid('grid', this.game.width, this.game.height, 64, 64, '#ffffff');
        this.graphics = this.game.add.graphics(0, 0);
    }

    create() {
        this.mission = new missions[this.game.mission](this.game);
        this.game.add.sprite(0,0,'grid');
        this.cellWidth = this.game.world.width / 10;
        this.cellHeight = this.game.world.height / 15;

        //Collection of all GameObjects created for the game
        this.objects = [];
        this.lastCalculation = 0;

        this.enemies = this.game.add.physicsGroup();


        this.game.stage.backgroundColor = 0x000000;

        this.setupInputListeners();

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

        let easystar = new EasyStar.js();

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

        this.game.easystar = easystar;
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
                this.state.start('Missions');
            }
        );
    }

    drawPlacedItems() {
        let gameData = this.game.gameData;

        let turrets = gameData.placedItems.filter((it) => it.type === 'Turret');
        let walls = gameData.placedItems.filter((it) => it.type === 'Wall');

        walls.forEach((it) => new gameObjects["Wall"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects]));
        turrets.forEach((it) => new gameObjects["Turret"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects], this.enemies));
    }

    hackListener() {
        console.log('hack!');
        this.inputMode = 'hack';
    }

    bombListener() {
        console.log('bomb!');
        this.inputMode = 'bomb';
    }

    setupInputListeners() {
        this.game.input.onTap.add((pointer, doubleTap) => {
            if (this.inputMode === 'bomb') {

                let explosion = this.game.add.sprite(pointer.position.x, pointer.position.y, 'explosion');
                explosion.anchor.setTo(0.5, 0.5);
                let explosionAnimation = explosion.animations.add('fly');
                explosion.animations.play('fly', 30, false);

                this.enemies.forEachAlive((sprite) => {
                    let dist = Math.sqrt((Math.abs(sprite.position.y - pointer.position.y) * Math.abs(sprite.position.y - pointer.position.y)) + (Math.abs(sprite.position.x - pointer.position.x) * Math.abs(sprite.position.x - pointer.position.x)));

                    //FIXME
                    //for now we just kills em
                    if (dist <= 50) {
                        sprite.shot();
                    }
                });

                explosionAnimation.onComplete.add(() => {
                    explosion.destroy();
                });
            }
        }, this);

    }

    update() {
        this.objects.forEach((it) => it.update());
        this.mission.update(this.enemies, this.objects);
        this.game.easystar.calculate();
    }

    shutdown() {
        console.log("shut down called");
    }
}
