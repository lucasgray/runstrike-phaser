
import Mission from './Mission';
import GridDescriptor from "../models/state/GridDescriptor";
import {GameState} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";

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
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
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
            ]);
    }

    background = () => {

        let background = this.game.add.sprite(0,0, 'wasteland-craters');
        let b = this.game.add.sprite(0,0, 'building-01');
        let b2 = this.game.add.sprite(64*8,64*10, 'building-01');
        let base = this.game.add.sprite(640/2 - (64 *2),960-(64*3), 'base');

        // let background = new Phaser.Sprite(this.game, 0, 0, 'skirmish-background');
        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;
        background.addChild(b);
        background.addChild(b2);
        background.addChild(base);

        return background;
    }
}
