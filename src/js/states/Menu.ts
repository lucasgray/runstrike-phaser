import Button from "../models/sprites/buttons/Button";
import * as GameData from "../models/state/GameData";
import Scanlines from "../filters/Scanlines";

export default class Menu extends Phaser.State {

    gameState: GameData.GameState;

    constructor(gameState: GameData.GameState) {
        super();

        this.gameState = gameState;
    }

    create() {
        if (!this.gameState.backgroundMusic || !this.gameState.hasStartedMusic) {
            this.gameState.backgroundMusic = this.game.add.audio('backgroundMusic');
            this.gameState.backgroundMusic.play();
            this.gameState.hasStartedMusic = true;
        } else if (this.gameState.backgroundMusic && this.gameState.musicPause) {
            this.gameState.backgroundMusic.resume();
        }

        let bkgrd = this.game.add.image(0, 0, 'retro-background');
        bkgrd.scale.setTo(.25, .5);

        let title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 20,
            "WAR ROOM", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + 125,
            this.game.width * 0.8,
            60,
            'Mission select',
            () => {
                console.log("asking to start mission select!");
                this.state.start('Missions');
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + 225,
            this.game.width * 0.8,
            60,
            'Debug',
            () => {
                console.log("asking to start debug!");
                this.state.start('Debug');
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + 325,
            this.game.width * 0.8,
            60,
            'art testing',
            () => {

                this.state.start('ArtTesting');
            }
        );
    }
}
