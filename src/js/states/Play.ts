import Button from "../models/sprites/buttons/Button";
import 'phaser';
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import InputHandler from "../handlers/InputHandler";
import TurretBuilder from "../models/builder/TurretBuilder";
import StandardMap from "../effects/StandardMap";
import HudPanel from "../panels/HudPanel";
import WrenchHandler from "../handlers/WrenchHandler";
import RocketHandler from "../handlers/RocketHandler";

export default class Play extends Phaser.State {

    gameState: GameState;
    mission: Mission;
    backgroundSprite: Phaser.Sprite;
    inputHandlers: Array<InputHandler>;

    effectsGroup: Phaser.Group;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    init(mission: Mission) {

        console.log('init mission');

        this.mission = mission;
        mission.reset();

        let bkgrd = this.mission.background();
        this.game.add.existing(bkgrd);

        this.backgroundSprite = bkgrd;

        let base = this.mission.base(false);
        this.mission.currentBase = base;
        this.game.add.existing(base);

        base.sendToBack();
        bkgrd.sendToBack();

        let builder = new TurretBuilder()
            .withGame(this.game)
            .andMission(this.mission);

        this.gameState.placedItems.forEach((it) => {

            let turret = builder
                .at({row: it.row, col: it.col})
                .withCurrentHealth(it.health)
                .buildForPlay(it.type);

            if (turret) {
                this.game.add.existing(turret);
                this.mission.turrets.add(turret);
                this.mission.doodads.add(turret.base);
            }
        });

        this.mission.recalculateGrid(this.gameState.placedItems);

        this.effectsGroup = StandardMap.AddMapEffects(this.game);

        this.drawInput();
        this.drawHud();
    }

    drawInput() {

        let rocketLoc = this.mission.gridDescriptor.getCenterOf(
            {x: this.mission.gridDescriptor.columns - 3.6, y: this.mission.gridDescriptor.rows - 1.1});

        this.inputHandlers = [];

        let ih = new RocketHandler(
            this.mission,
            this.gameState,
            this.inputHandlers,
            this.backgroundSprite,
            this.game,
            rocketLoc.x,
            rocketLoc.y);

        this.inputHandlers.push(ih);
    }

    drawHud() {

        let placement = new Phaser.Point(
            (this.mission.gridDescriptor.columns - 2.5) * this.mission.gridDescriptor.cellWidth,
            (this.mission.gridDescriptor.rows - 3.75) * this.mission.gridDescriptor.cellHeight
        );

        let hudPanel = new HudPanel(this.game, placement, this.mission);
        this.game.add.existing(hudPanel);
    }

    update() {
        this.mission.update();
    }

    shutdown() {
        console.log("shut down called");
        this.mission.shutdown();
        this.inputHandlers.forEach(_ => _.shutdown());
    }
}
