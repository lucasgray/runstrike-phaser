import Button from "../objects/Button";
import {GameState} from "../objects/GameData";
import Skirmish from "../missions/Skirmish";

export default class Missions extends Phaser.State {

    gameState: GameState;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    create() {

        let title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Select Mission", {
            font: '60px Righteous',
            fill: 'white',
            align: 'center'
        });
        title.anchor.setTo(0.5);


        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (70),
            this.game.width * 0.8,
            60,
            'Skirmish', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new Skirmish(this.game));
            }
        );

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }

}
