import Button from "../models/sprites/buttons/Button";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "../handlers/InputHandler";
import TurretBuilder from "../models/builder/TurretBuilder";
import StandardMap from "../effects/StandardMap";
import StandardTurretHandler from "../handlers/TurretHandlers";
import TurretSetupPanel from "../panels/TurretSetupPanel";
import SmartGroup from "../extensions/SmartGroup";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;
    backgroundSprite: Phaser.Sprite;

    setupPanel: TurretSetupPanel;

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

        this.mission.reset();

        let effectsGroup = StandardMap.AddMapEffects(this.game);
        this.game.add.existing(effectsGroup);

        let spr = this.mission.background();
        this.game.add.existing(spr);
        spr.sendToBack();
        this.backgroundSprite = spr;

        //TODO draw legal placement markers here!



        console.log(this.gameState.placedLoot);

        this.drawInputs();
        this.drawSetupTurrets();
    }

    drawInputs() {

        this.setupPanel = new TurretSetupPanel(this.game,
            new Phaser.Point(0, this.mission.gridDescriptor.cellHeight * 4),
            this.mission,
            this.gameState,
            this.backgroundSprite
        );

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', () => {
                console.log("asking to go back");
                this.state.start('Missions');
            }
        );
    }

    drawSetupTurrets() {

        let builder = new TurretBuilder()
            .withGame(this.game)
            .andState(this.gameState)
            .andMission(this.mission)
            .andInputHandlers(this.setupPanel.handlers);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            let turret = builder
                .at({row: it.row, col: it.col})
                .buildForSetup(it.type);

            this.game.add.existing(turret);
        });

    }
}
