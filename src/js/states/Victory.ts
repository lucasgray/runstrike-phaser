import {GameState} from "../models/state/GameData";
import Button from "../models/sprites/buttons/Button";
import Mission from "../missions/Mission";

//TODO victory and defeat could share a lot of codez

export default class Victory extends Phaser.State {

    gameState: GameState;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    init(mission: Mission) {

        this.gameState.markMissionAsWon(mission);

        this.gameState.backgroundMusic.pause();
        this.gameState.musicPause = true;

        let win = this.game.add.audio('win');
        win.play();

        let title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 200,
            "Victory!", {
                font: '50px Joystix',
                fill: 'white',
                align: 'center'
            });
        title.anchor.setTo(0.5);

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'back', () => {
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
