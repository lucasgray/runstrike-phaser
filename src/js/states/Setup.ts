import Button from "../objects/Button";
import TurretHandler from "../handlers/setup/TurretHandler"
import Mission from "../missions/Mission";
import { GameState } from "../objects/GameData";
import Turret from "../objects/Turret";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;
    backgroundSprite : Phaser.Sprite;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
        console.log("setup")
    }

    init(mission: Mission) {
        this.mission = mission;
        console.log("mission" + mission);
    }

    create() {

        let spr = this.mission.background();
        this.game.add.existing(spr);
        spr.sendToBack();

        console.log(this.gameState.placedLoot);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            //TODO factory or something
            if (it.type.toLowerCase() == 'turret') {
                let turret = new Turret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }
        });

        this.drawInputs();
    }

    drawInputs() {

        // Object.keys(setupInputHandlers).forEach((ih,index) => {
        //     new setupInputHandlers[ih](this.game, 50, 300 + (90 * index));
        // });
        new TurretHandler(this.mission, [], this.gameState, this.backgroundSprite, this.game, 50, 300);

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', ()=>{
                console.log("asking to go back");
                this.state.start('Missions');
            }
        );

        new Button(
            this.game,
            this.game.width - 80,
            this.game.height - 40,
            100,
            40,
            'Defend', ()=>{
                console.log("asking to defend");
                this.state.start('Play', true, false, this.mission, this.gameState);
            }
        );
    }
}
