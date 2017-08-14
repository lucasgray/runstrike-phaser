
import Mission from './Mission';
import GridDescriptor from "../extensions/GridDescriptor";
import {GameState} from "../objects/GameData";
import Drone from "../objects/Drone";

export default class Skirmish extends Mission {

    gridDescriptor: GridDescriptor;
    name = 'Skirmish';

    enemyArray = [
        //TODO
        // { type: 'Intro', delay: 0, showFor: 1000, size: 'large', at: 100, image: 'clock', imageSrc:'img/cocktail.png', imageSize: {row:128,col:128}, messages: ['','The','Droids','Are','Coming!']},
        { type: 'Drone', delay: 1000, size: 'large', at: 3},
        { type: 'Drone', delay: 600, size: 'medium', at: 4},
        { type: 'Drone', delay: 900, size: 'small', at: 5},
        { type: 'Drone', delay: 400, size: 'large', at: 1},
        { type: 'Drone', delay: 60, size: 'medium', at: 3},
        { type: 'Drone', delay: 300, size: 'small', at: 6},
        { type: 'Drone', delay: 300, size: 'large', at: 10},
        { type: 'Drone', delay: 300, size: 'medium', at: 6},
        { type: 'Drone', delay: 3000, size: 'small', at: 7}
    ];

    constructor(game: Phaser.Game, gameState: GameState) {
        super(game, gameState.placedLoot);

        this.gridDescriptor = new GridDescriptor(game.width, game.height, 15, 20);

    }

    background = () => {
        let background = new Phaser.Sprite(this.game, this.gridDescriptor.offsetX, 0, 'skirmish-background');
        background.width = this.gridDescriptor.width;
        background.height = this.gridDescriptor.height;
        background.inputEnabled = true;

        return background;
    }
}
