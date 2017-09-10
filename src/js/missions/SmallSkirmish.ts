
import Mission from './Mission';
import GridDescriptor from "../models/state/GridDescriptor";
import {GameState} from "../models/state/GameData";
import Drone from "../models/sprites/enemies/Drone";

export default class SmallSkirmish extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Small Skirmish';

    enemyArray = [
        //TODO
        // { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {row:128,col:128}, messages: ['','The','Droids','Are','Coming!']},
        { type: 'Shield', delay: 0, size: 'large', at: 3}
    ];

    constructor(game: Phaser.Game) {
        super(game);

        this.gridDescriptor = new GridDescriptor(game.width, game.height, 8, 12);
    }

    background = () => {
        let background = new Phaser.Sprite(this.game, this.gridDescriptor.offsetX, 0, 'skirmish-background');
        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;

        return background;
    }
}
