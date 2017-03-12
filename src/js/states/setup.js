import * as easystar from "easystarjs";
import Buttons from "../extensions/Buttons";
import SpriteHelper from "../helpers/SpriteHelper";
import * as gameObjects from "../objects";

export default class Setup extends Phaser.State {

    preload() {
        this.game.create.grid('grid', this.game.width, this.game.height, 64, 64, '#ffffff');
    }

    create() {

        this.objects = [];
        this.enemies = this.game.add.physicsGroup();

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

        let turrets = gameData.placedItems.filter((it) => it.type === 'Turret');
        let walls = gameData.placedItems.filter((it) => it.type === 'Wall');

        walls.forEach((it) => new gameObjects["Wall"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects]));
        turrets.forEach((it) => new gameObjects["Turret"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects], this.enemies));
    }

    makeTurret(x, y) {
        new gameObjects["Turret"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects], this.enemies);
    }

    makeWall(x, y) {
        new gameObjects["Wall"](this.game, it.x * this.cellWidth, it.y * this.cellHeight, [this.objects]);
    }

    drawInputs() {

        SpriteHelper.drawTurret(this.game, 0, 0, () => {
            console.log("making turret");
            this.placeTurretMode = true;

            console.log("input is at " + this.game.input.position.x, + "," + this.game.input.position.y);

            this.curTurret = SpriteHelper.drawTurret(this.game, this.game.input.x, this.game.input.y);
        });

        this.drawColor(0x0000FF, 0, 64, () => {
            console.log("making wall");
            this.placeWallMode = true;

            this.curWall = this.drawColor(0x0000FF, this.game.input.x - 32, this.game.input.y - (64+32));
        });

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

    drawColor(color, x, y, callback) {
        var g = this.game.add.graphics(0, 0);
        g.lineStyle(2, color, 0.5);
        g.beginFill(color, 1);
        g.drawRect(x, y, 64, 64); //no anchor, need to move it!
        g.endFill();

        g.inputEnabled = true;

        if (callback) {
            g.events.onInputDown.add(callback, this.game);
        }

        return g;
    }

    update() {

        if (this.game.input.activePointer.isDown)
        {
            console.log('down!')
            if (this.curTurret) {
                this.curTurret.x = this.game.input.x;
                this.curTurret.y = this.game.input.y;
            } else if (this.curWall) {
                this.curWall.x = this.game.input.x - 32;
                this.curWall.y = this.game.input.y - 32;
            }
        } else {
            if (this.curTurret) {

                console.log("placing turret!");
                this.curTurret.destroy();
                this.curTurret = null;

                let gridX = Math.floor(this.game.input.x / 64);
                let gridY = Math.floor(this.game.input.y / 64);

                console.log("placing turret at " + gridX + "," + gridY);

                this.game.gameData.placedItems.push({
                    type: 'Turret',
                    x: gridX,
                    y: gridY
                })

                var turret = new gameObjects["Turret"](this.game, gridX * 64, gridY * 64, [this.objects], this.enemies);

            } else if (this.curWall) {
                console.log("placing wall!");
                this.curWall.destroy();
                this.curWall = null;

                let gridX = Math.floor(this.game.input.x / 64);
                let gridY = Math.floor(this.game.input.y / 64);

                console.log("placing wall at " + gridX + "," + gridY);

                this.game.gameData.placedItems.push({
                    type: 'Wall',
                    x: gridX,
                    y: gridY
                })

                var wall = new gameObjects["Wall"](this.game, gridX*64, gridY*64, [this.objects]);
            }
        }

    }
}
