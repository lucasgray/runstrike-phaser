
import Mission from './Mission';
import GridDescriptor from "../models/state/GridDescriptor";
import {GameState} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";
import PercentBar from "../models/sprites/enemies/PercentBar";
import Base from "../models/sprites/base/Base";

export default class LargeSkirmish extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Large Skirmish';

    // enemyArray = [
    //     //TODO
    //     // { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {row:128,col:128}, messages: ['','The','Droids','Are','Coming!']},
    //
    //     { type: 'ShipOne', delay: 1000, size: 'large', at: 2},
    //     { type: 'ShipTwo', delay: 1200, size: 'medium', at: 4},
    //     { type: 'ShipOne', delay: 3200, size: 'small', at: 5},
    //     { type: 'ShipThree', delay: 400, size: 'large', at: 1},
    //     { type: 'ShipOne', delay: 800, size: 'medium', at: 3}
    // ];

    enemyArray: Array<object>;

    constructor(game: Phaser.Game, wave: Array<object>) {
        super(game);
        this.game = game;
        this.enemyArray = wave;

        this.gridDescriptor = new GridDescriptor(
            game.width,
            game.height,
            [
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            [
                [3,14],
                [4,14],
                [5,14],
                [6,14]
            ]
            );
    }

    /**
     * glue together all doodads and the flat background
     *
     * @returns {Phaser.Sprite}
     */
    background = () => {

        let background = new Phaser.Sprite(this.game, 0,0, 'wasteland-craters');

        //left side!!
        let b1 = new Phaser.Sprite(this.game, -85, -12, 'building-02');
        let b2 = new Phaser.Sprite(this.game, 64*2 - 6,64*6, 'building-04');
        b2.angle = 90;
        b2.scale.x *= -1;
        let b3 = new Phaser.Sprite(this.game, -35,64*6 - 12, 'building-05');
        let b35 = new Phaser.Sprite(this.game, 64*2 - 4,64 * 14 + 8, 'building-06');
        b35.angle = 90;
        b35.scale.x *= -1;
        let b5 = new Phaser.Sprite(this.game, -87,64*14 - 42, 'building-03');

        //right side!!
        let b6 = new Phaser.Sprite(this.game, 64 * 7 +25,-25, 'building-03');
        let b7 = new Phaser.Sprite(this.game, 64 * 9 - 25,64 * 2 - 25, 'building-06');
        let b8 = new Phaser.Sprite(this.game, 64 * 9 - 39,64*4 - 16, 'building-01');
        let b9 = new Phaser.Sprite(this.game, 64 * 9 - 15,64*9 - 19, 'building-05');
        let b10 = new Phaser.Sprite(this.game, 64 * 8, 64*14 - 15, 'building-03');

        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;

        background.addChild(b1);
        background.addChild(b3);
        background.addChild(b2);
        background.addChild(b35);
        background.addChild(b5);


        background.addChild(b6);
        background.addChild(b7);
        background.addChild(b8);
        background.addChild(b9);
        background.addChild(b10);


        return background;
    }
}
