
import Mission from './Mission';
import GridDescriptor from "../models/state/GridDescriptor";
import {GameState} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";

export default class StoryThree extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Story Three';

    enemyArray = [
        //TODO
        // { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {row:128,col:128}, messages: ['','The','Droids','Are','Coming!']},
        { type: 'Drone', delay: 1000, size: 'large', at: 3},
        { type: 'Drone', delay: 400, size: 'large', at: 1},
        { type: 'Drone', delay: 300, size: 'small', at: 6},
        { type: 'Drone', delay: 300, size: 'medium', at: 6},
        { type: 'Drone', delay: 3000, size: 'small', at: 7},
        { type: 'Drone', delay: 600, size: 'medium', at: 4},
        { type: 'Drone', delay: 900, size: 'small', at: 5},
        { type: 'Drone', delay: 60, size: 'medium', at: 3},
        { type: 'Drone', delay: 300, size: 'small', at: 6}
    ];

    constructor(game: Phaser.Game) {
        super(game);
        this.game = game;

        this.gridDescriptor = new GridDescriptor(
            game.width,
            game.height,
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1]
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ],
            [
                [3,11],
                [4,11],
            ]
        );
    }

    background = () => {
        let background = new Phaser.Sprite(this.game, 0, 0, 'skirmish-background');
        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;

        return background;
    }

    base = () => {
        return new Phaser.Sprite(this.game,640/2 - (64 *2),960-(64*3), 'base');
    }
}
