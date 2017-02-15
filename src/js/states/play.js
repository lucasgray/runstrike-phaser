import * as easystar from "easystarjs";

export default class Play extends Phaser.State {


    preload() {
        this.game.create.grid('grid', this.game.width, this.game.height, 64, 64, '#ffffff');
        this.sprites = [];

        this.graphics = this.game.add.graphics(0, 0);
    }

    create() {
        this.game.add.sprite(0,0,'grid');

        console.log('width: ' + this.game.world.width)
        console.log('height: ' + this.game.world.height)

        this.cellWidth = this.game.world.width / 10;
        this.cellHeight = this.game.world.height / 15;

        this.game.stage.backgroundColor = 0x000000;
        this.bomb = null;
        this.hack = null;
        this.wall = null;
        this.explosion = null;


        this.game.input.onTap.add(this.onTap, this);

        this.setupGrid();

        this.drawHealth();

        this.drawInput();

        this.drawPlacedItems();

        this.drawEnemies();

        this.startPathfinding();

        // this.drawInventory(game);

        // this.drawBase(game);

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
    }

    drawEnemies() {

        let gameData = this.game.gameData;

        if (gameData.status === 'attacking') {

            gameData.shadows.forEach((shadow) => {

                console.log(shadow);

                var baddiesToMake = 0;

                if (shadow.size === 'large') {
                    baddiesToMake = 5;
                } else if (shadow.size === 'medium') {
                    baddiesToMake = 2;
                } else if (shadow.size === 'small') {
                    baddiesToMake = 1;
                }

                [... new Array(baddiesToMake)].map((_, i) => {
                    console.log(i);

                    //somewhere in a 500 range
                    var offset = Math.floor(Math.random() * 500) - 250;

                    let x = shadow.at + offset;

                    if (x < 0) {
                        offset = 0;
                    } if (x >= this.game.width) {
                        offset = this.game.width;
                    }

                    //center cell of cell 5 (index)
                    this.makeDrone(shadow.at + offset);
                });

                this.sprites.forEach((curSprite) => {

                    let curXCell = Math.floor((curSprite.x / 640) * 10);
                    let curYCell = Math.floor((curSprite.y / 960) * 15);

                    console.log("where am i? " + curXCell + " , " + curYCell)

                    //640x960 find path to bottom left of the screen
                    this.easystar.findPath(curXCell, curYCell, 5, 14, (path) => {

                        if (path === null) {
                            console.log("The path to the destination point was not found.");
                        } else {
                            console.log("easystar success. ");

                            path.forEach((p) => console.log(JSON.stringify(p)));
                            curSprite.path = path;
                        }
                    });

                    this.easystar.calculate();
                });

            });

        } else {
            console.log('not implemented yet!!!');
        }
    }

    startPathfinding() {
        setInterval(() => {

            if (this.sprites) {

                this.sprites.forEach((sprite) => {

                    if (!sprite.lastMove && !sprite.dead) {

                        //if we're in the process of moving from loc a to b, keep going
                        //otherwise prep the next step

                        var path = sprite.path;

                        var first = path[0];
                        var second = path[1];

                        //negative is left, positive is right.
                        var xDirection = second.x - first.x;

                        //second.y * 64 to convert to cells
                        if (sprite.body.y >= (second.y * 64)
                        ) {
                            console.log("we made it! altering path");

                            path = path.slice(1);
                            sprite.path = path;

                            first = path[0];
                            second = path[1];
                        }

                        //we want to move towards the CENTER of the next cell.
                        let xToGo = second.x * 64 + 32;
                        let yToGo = second.y * 64 + 32;

                        let velocity = 100;

                        if (yToGo >= this.game.height - 64) {
                            sprite.lastMove = true;
                            console.log("last move. moving to " + xToGo + "," + this.game.height)
                            this.game.physics.arcade.moveToXY(sprite, xToGo, this.game.height, velocity);
                        }

                        console.log("moving to " + xToGo + "," + yToGo)
                        this.game.physics.arcade.moveToXY(sprite, xToGo, yToGo, velocity);
                    } else {
                        console.log('lastmoved.')
                    }
                });
            }

        }, 400);
    }

    drawPlacedItems() {
        let gameData = this.game.gameData;

        let turrets = gameData.placedItems.filter((it) => it.type === 'turret');
        let walls = gameData.placedItems.filter((it) => it.type === 'wall');

        walls.forEach((it) => this.makeWall(it.x * this.cellWidth, it.y * this.cellHeight));
        turrets.forEach((it) => this.makeTurret(it.x * this.cellWidth, it.y * this.cellHeight));

        setInterval(() => {



        }, 1000);

    }

    makeDrone(where) {
        let sprite = this.game.add.sprite(where, 0, 'drone');
        sprite.animations.add('fly');
        sprite.animations.play('fly', 30, true);
        sprite.scale.setTo(.5, .5);
        sprite.anchor.setTo(.5, .5);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.droneListener, this);

        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        //sprite.body.velocity.y = 10;

        this.sprites.push(sprite);
    }

    makeTurret(x, y) {
        this.graphics.lineStyle(2, 0x00FF00, 1);
        this.graphics.drawRect(x, y, 64, 64);
    }

    makeWall(x, y) {

        this.graphics.lineStyle(2, 0x0000FF, 1);
        this.graphics.drawRect(x, y, 64, 64);
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

    bombListener() {
        console.log('bomb!');
        this.bomb = true;
    }

    droneListener(sprite, f) {
        if (this.hack) {

            sprite.dead = true;

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
}
