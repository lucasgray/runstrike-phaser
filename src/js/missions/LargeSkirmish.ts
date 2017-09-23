
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
        { type: 'Shield', delay: 1000, size: 'large', at: 3},
        { type: 'Shield', delay: 0, size: 'medium', at: 4},
        { type: 'Shield', delay: 0, size: 'small', at: 5},
        { type: 'Shield', delay: 0, size: 'large', at: 6},
        { type: 'Shield', delay: 0, size: 'medium', at: 7},
        { type: 'Drone', delay: 300, size: 'small', at: 6},
        { type: 'Lurker', delay: 300, size: 'large', at: 9},
        { type: 'Drone', delay: 300, size: 'medium', at: 6},
        { type: 'Lurker', delay: 0, size: 'small', at: 7},
        { type: 'Drone', delay: 1000, size: 'large', at: 9},
        { type: 'Lurker', delay: 600, size: 'medium', at: 4},
        { type: 'Lurker', delay: 900, size: 'small', at: 5},
        { type: 'Lurker', delay: 400, size: 'large', at: 9},
        { type: 'Lurker', delay: 60, size: 'medium', at: 3},
        { type: 'Drone', delay: 300, size: 'small', at: 6},
        { type: 'Drone', delay: 300, size: 'large', at: 9},
        { type: 'Lurker', delay: 300, size: 'medium', at: 9},
        { type: 'Drone', delay: 3000, size: 'small', at: 9}
    ];

    constructor(game: Phaser.Game) {
        super(game);

        this.gridDescriptor = new GridDescriptor(
            game.width,
            game.height,
            10,
            15,
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
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
            ]);
    }

    background = () => {

        let background = this.game.add.sprite(0,0, 'wasteland-craters');
        let b = this.game.add.sprite(0,0, 'building-01');
        b.tint = 0x71e64a;
        let b2 = this.game.add.sprite(64*8,64*10, 'building-01');
        b2.tint = 0x71e64a;
        let base = this.game.add.sprite(640/2 - (64 *2),960-(64*3), 'base');
        base.tint = 0xe64abf;

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
