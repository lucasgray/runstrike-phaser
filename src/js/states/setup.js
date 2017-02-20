import * as easystar from "easystarjs";
import _ from 'lodash';
import Buttons from "../extensions/Buttons";

export default class Setup extends Phaser.State {

    preload() {
        this.game.create.grid('grid', this.game.width, this.game.height, 64, 64, '#ffffff');
        this.sprites = [];
    }

    create() {

        this.game.add.sprite(0,0,'grid');
        this.btnDownSound = this.add.sound('menuDown');

        console.log('width: ' + this.game.world.width)
        console.log('height: ' + this.game.world.height)

        this.cellWidth = this.game.world.width / 10;
        this.cellHeight = this.game.world.height / 15;

        this.game.stage.backgroundColor = 0x000000;

        this.drawPlacedItems();

        this.drawInputs();

    }

    drawPlacedItems() {
        let gameData = this.game.gameData;

        let turrets = gameData.placedItems.filter((it) => it.type === 'turret');
        let walls = gameData.placedItems.filter((it) => it.type === 'wall');

        walls.forEach((it) => this.makeWall(it.x * this.cellWidth, it.y * this.cellHeight));
        turrets.forEach((it) => this.makeTurret(it.x * this.cellWidth, it.y * this.cellHeight));
    }

    makeTurret(x, y) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0x00FF00, 1);
        graphics.drawRect(x, y, 64, 64);
    }

    makeWall(x, y) {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.drawRect(x, y, 64, 64);
    }

    drawInputs() {

        var g = this.game.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x0000FF, 1);
        g.drawRect(0, 0, 64, 64);
        g.endFill();
        g.inputEnabled = true;
        g.events.onInputDown.add(function () {
            console.log("turret selected...");
        }, this.game);

        var g2 = this.game.add.graphics(0, 0);
        g2.lineStyle(2, 0x00FF00, 0.5);
        g2.beginFill(0x00FF00, 1);
        g2.drawRect(0, 64, 64, 64);
        g2.endFill();
        g2.inputEnabled = true;
        g2.events.onInputDown.add(function () {
            console.log("wall selected...");
        }, this.game);

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


}
