import Button from "../models/sprites/buttons/Button";
import 'phaser';
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import CocktailHandler from "../handlers/CocktailHandler";
import InputHandler from "../handlers/InputHandler";
import TurretBuilder from "../models/builder/TurretBuilder";
import StandardMap from "../effects/StandardMap";
import SmartGroup from "../extensions/SmartGroup";
import HudPanel from "../panels/HudPanel";
import WrenchHandler from "../handlers/WrenchHandler";

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

    init(mission: Mission, gameState: GameState) {

        console.log('init mission');

        this.mission = mission;
        this.gameState = gameState;

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

        this.gameState.placedLoot.forEach((it) => {

            let turret = builder
                .at({row: it.row, col: it.col})
                .buildForPlay(it.type);

            if (turret) {
                this.game.add.existing(turret);
                this.mission.turrets.add(turret);
                this.mission.doodads.add(turret.base);
            }
        });

        this.mission.recalculateGrid(gameState.placedLoot);

        this.effectsGroup = StandardMap.AddMapEffects(this.game);

        this.drawInput();
        this.drawHud();

        //eh I think I like having the guidelines...
        this.mission.addSetupGuidelines();
    }

    drawInput() {

        let cocktailLoc = this.mission.gridDescriptor.getCenterOf(
            {x: this.mission.gridDescriptor.columns - 3, y: this.mission.gridDescriptor.rows - 1});

        this.inputHandlers = [];

        let ih = new CocktailHandler(
            this.mission,
            this.gameState,
            this.inputHandlers,
            this.backgroundSprite,
            this.game,
            cocktailLoc.x,
            cocktailLoc.y);

        let cocktailLoc2 = this.mission.gridDescriptor.getCenterOf(
            {x: this.mission.gridDescriptor.columns - 4, y: this.mission.gridDescriptor.rows - 1});

        let ih2 = new WrenchHandler(
            this.mission,
            this.gameState,
            this.inputHandlers,
            this.mission.turrets.all(),
            this.game,
            cocktailLoc2.x,
            cocktailLoc2.y);

        this.inputHandlers.push(ih);
        this.inputHandlers.push(ih2);

        // new Button(
        //     this.game,
        //     100,
        //     this.game.height - 40,
        //     100,
        //     40,
        //     'Back', () => {
        //         console.log("asking to go to menu");
        //         this.state.start('Missions');
        //     }
        // );
    }

    drawHud() {

        let placement = new Phaser.Point(
            (this.mission.gridDescriptor.columns - 2) * this.mission.gridDescriptor.cellWidth,
            (this.mission.gridDescriptor.rows -3) * this.mission.gridDescriptor.cellHeight
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
