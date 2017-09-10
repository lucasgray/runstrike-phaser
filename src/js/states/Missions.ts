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

        this.gameState.missionInfo.forEach((m, i) => {

            let beat = m[1].beat;
            //lock this one if its not the first and you havent beat the last one

            let isFirstStory = m[0].name === "Story One";
            let isSkirmish = m[0].name.indexOf("Skirmish") !== -1;

            let shouldBeLocked = !isFirstStory && !isSkirmish && (i !== 0 ? !this.gameState.missionInfo[i-1][1].beat : false);

            let name = m[0].name;
            if (shouldBeLocked) name += "(locked)";
            if (beat) name += "(play again)";

            let action = shouldBeLocked ? () => null : () => this.game.state.start('Setup', true, false, m[0]);

            new Button(
                this.game,
                this.game.world.centerX,
                this.game.world.centerY + (i * 70),
                this.game.width * 0.8,
                60,
                name,
                action
            );
        });

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
