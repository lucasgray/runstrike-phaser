import Button from "../models/sprites/Button";
import {GameState} from "../models/state/GameData";
import LargeSkirmish from "../missions/LargeSkirmish";
import SmallSkirmish from "../missions/SmallSkirmish";
import StoryOne from "../missions/StoryOne";
import StoryTwo from "../missions/StoryTwo";
import BossOne from "../missions/BossOne";
import StoryThree from "../missions/StoryThree";

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
            this.game.world.centerY,
            this.game.width * 0.8,
            60,
            'Small Skirmish', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new SmallSkirmish(this.game));
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (70),
            this.game.width * 0.8,
            60,
            'Large Skirmish', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new LargeSkirmish(this.game));
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (140),
            this.game.width * 0.8,
            60,
            'Story I', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new StoryOne(this.game));
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (210),
            this.game.width * 0.8,
            60,
            'Story II', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new StoryTwo(this.game));
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (280),
            this.game.width * 0.8,
            60,
            'Story III', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new StoryThree(this.game));
            }
        );

        new Button(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY + (350),
            this.game.width * 0.8,
            60,
            'BOSS', ()=>{
                console.log("asking to play a mission!");
                this.game.state.start('Setup', true, false, new BossOne(this.game));
            }
        );

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Menu', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }
}
