import Button from "../models/sprites/buttons/Button";
import 'phaser';
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import CocktailHandler from "../handlers/CocktailHandler";
import InputHandler from "../handlers/InputHandler";
import SmartGroup from "../extensions/SmartGroup";
import Drone from "../models/sprites/enemies/Drone";
import Projectile from "../models/sprites/projectiles/Projectile";
import {RedTurret, YellowTurret, OrangeTurret, BlueTurret, GreenTurret} from "../models/sprites/turrets/Turrets";
import TurretBuilder from "../models/builder/TurretBuilder";

export default class Play extends Phaser.State {

    gameState: GameState;
    mission: Mission;
    backgroundSprite: Phaser.Sprite;
    inputHandlers: Array<InputHandler>;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    init(mission: Mission, gameState: GameState) {

        console.log('init mission');

        this.mission = mission;
        this.gameState = gameState;

        mission.enemies = new SmartGroup<Drone>(this.game);
        mission.projectiles = new SmartGroup<Projectile>(this.game);

        let spr = this.mission.background();
        this.game.add.existing(spr);
        spr.sendToBack();
        this.backgroundSprite = spr;

        let builder = new TurretBuilder()
            .withGame(this.game)
            .andMission(this.mission);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            let turret = builder
                .at({row: it.row, col: it.col})
                .buildForPlay(it.type);

            this.game.add.existing(turret);
        });

        this.mission.recalculateGrid(gameState.placedLoot);

        this.drawHealth();
        this.drawInput();
    }

    drawHealth() {
        //Draw rectangles for health of enemy army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(0, 0, 80, 1080);

        // let w = this.game.world.width;
        // let h = this.game.world.height;

        //Draw rectangles for health of player army
        // this.graphics.beginFill(0x00FF00);
        // this.graphics.lineStyle(2, 0x0000FF, 1);
        // this.graphics.drawRect(w-80, 0, 80, 1080);
    }

    drawInput() {

        let ih = new CocktailHandler(this.mission, this.gameState, this.backgroundSprite, this.game, 50, 300);
        this.inputHandlers = [];
        this.inputHandlers.push(ih);

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', () => {
                console.log("asking to go to menu");
                this.state.start('Missions');
            }
        );
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
