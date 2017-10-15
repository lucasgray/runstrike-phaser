
import Mission from './Mission';
import GridDescriptor from "../models/state/GridDescriptor";
import {GameState} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";
import PercentBar from "../models/sprites/enemies/PercentBar";

export default class LargeSkirmish extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Large Skirmish';

    enemyArray = [
        //TODO
        // { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {row:128,col:128}, messages: ['','The','Droids','Are','Coming!']},

        { type: 'ShipOne', delay: 1000, size: 'large', at: 9},
        { type: 'ShipTwo', delay: 1200, size: 'medium', at: 4},
        { type: 'ShipOne', delay: 3200, size: 'small', at: 5},
        { type: 'ShipThree', delay: 400, size: 'large', at: 9},
        { type: 'ShipOne', delay: 800, size: 'medium', at: 3}
    ];

    constructor(game: Phaser.Game) {
        super(game);
        this.game = game;

        this.gridDescriptor = new GridDescriptor(
            game.width,
            game.height,
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            [
                [4,12],
                [4,13],
                [5,13],
                [4,14],
                [5,14]
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
        let b = new Phaser.Sprite(this.game,0,0, 'building-01');
        let b2 = new Phaser.Sprite(this.game,64*8,64*10, 'building-01');

        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;
        background.addChild(b);
        background.addChild(b2);

        return background;
    }

    /**
     * Base sprite for u
     */
    base = () => {

        let base = new Phaser.Sprite(this.game,640/2 - (64 *2),960-(64*3), 'base');

        base.health = 10000;
        base.maxHealth = 10000;
        //health bar starts off on top?
        this.game.add.existing(new PercentBar(this.game, base, base, 5, 1, Phaser.TOP_LEFT));

        return base;
    }
}
