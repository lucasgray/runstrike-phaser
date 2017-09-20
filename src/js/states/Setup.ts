import Button from "../models/sprites/buttons/Button";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "../handlers/InputHandler";
import TurretBuilder from "../models/builder/TurretBuilder";
import StandardMap from "../effects/StandardMap";
import StandardTurretHandler from "../handlers/TurretHandlers";
import TurretSetupPanel from "../panels/TurretSetupPanel";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;
    backgroundSprite: Phaser.Sprite;

    //add placed items here, so they always exist UNDER effects
    placementGroup: Phaser.Group;
    //effects go next, so they end up on TOP of placed items!
    effectsGroup: Phaser.Group;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
        console.log("setup")
    }

    init(mission: Mission) {
        this.mission = mission;
        console.log("mission" + mission);

        this.placementGroup = new Phaser.Group(this.game);
        this.effectsGroup = new Phaser.Group(this.game);
    }

    create() {

        let spr = this.mission.background();
        this.game.add.existing(spr);
        spr.sendToBack();
        this.backgroundSprite = spr;

        //TODO draw legal placement markers here!

        this.effectsGroup = StandardMap.AddMapEffects(this.game);

        console.log(this.gameState.placedLoot);

        let handlers = this.drawInputs();

        this.drawSetupTurrets(handlers);
    }

    drawInputs() : Array<InputHandler> {

        let setupPanel = new TurretSetupPanel(this.game, new Phaser.Point(0, this.mission.gridDescriptor.cellHeight * 4), this.mission.gridDescriptor);
        this.placementGroup.add(setupPanel.sprite);

        let allTurretHandlers = Array<InputHandler>();
        allTurretHandlers.push(new StandardTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 64, 320, this.placementGroup));

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

        new Button(
            this.game,
            this.game.width - 80,
            this.game.height - 40,
            100,
            40,
            'Defend', () => {
                console.log("asking to defend");
                this.state.start('Play', true, false, this.mission, this.gameState);
            }
        );

        return allTurretHandlers;
    }

    drawSetupTurrets(handlers: Array<InputHandler>) {

        let builder = new TurretBuilder()
            .withGame(this.game)
            .andState(this.gameState)
            .andMission(this.mission)
            .andInputHandlers(handlers);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            let turret = builder
                .at({row: it.row, col: it.col})
                .buildForSetup(it.type);

            this.game.add.existing(turret);
            if (turret !== undefined) this.placementGroup.add(turret.base);
            this.placementGroup.add(turret);
        });

    }
}
