import Button from "../models/sprites/buttons/Button";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "../handlers/InputHandler";
import BlueTurretHandler from "../handlers/BlueTurretHandler";
import GreenTurretHandler from "../handlers/GreenTurretHandler";
import RedTurretHandler from "../handlers/RedTurretHandler";
import OrangeTurretHandler from "../handlers/OrangeTurretHandler";
import YellowTurretHandler from "../handlers/YellowTurretHandler";
import {
    BlueSetupTurret,
    GreenSetupTurret,
    RedSetupTurret,
    YellowSetupTurret,
    OrangeSetupTurret,
} from "../models/sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import TurretBuilder from "../models/builder/TurretBuilder";
import StandardMap from "../effects/StandardMap";
import StandardTurretHandler from "../handlers/StandardTurretHandler";

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

        let allTurretHandlers = Array<InputHandler>();
        allTurretHandlers.push(new StandardTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 210, this.placementGroup));
        // allTurretHandlers.push(new BlueTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 300, this.placementGroup));
        // allTurretHandlers.push(new GreenTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 390, this.placementGroup));
        // allTurretHandlers.push(new RedTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 480, this.placementGroup));
        // allTurretHandlers.push(new OrangeTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 570, this.placementGroup));
        // allTurretHandlers.push(new YellowTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 660, this.placementGroup));

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
            this.placementGroup.add(turret);
        });

    }
}
