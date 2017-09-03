import Button from "../models/sprites/Button";
import 'phaser';
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import BlueTurret from "../models/sprites/turrets/BlueTurret";
import CocktailHandler from "../handlers/CocktailHandler";
import InputHandler from "../handlers/InputHandler";
import GreenTurret from "../models/sprites/turrets/GreenTurret";
import YellowTurret from "../models/sprites/turrets/YellowTurret";
import RedTurret from "../models/sprites/turrets/RedTurret";
import OrangeTurret from "../models/sprites/turrets/OrangeTurret";
import SmartGroup from "../extensions/SmartGroup";
import Drone from "../models/sprites/enemies/Drone";
import Projectile from "../models/sprites/projectiles/Projectile";

export default class Play extends Phaser.State {

    gameState : GameState;
    mission : Mission;
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

        //TODO refactor this into something
        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            //TODO factory or something
            if (it.type.toLowerCase() == 'blue-turret') {
                let turret = new BlueTurret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'green-turret') {
                let turret = new GreenTurret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'yellow-turret') {
                let turret = new YellowTurret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'red-turret') {
                let turret = new RedTurret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'orange-turret') {
                let turret = new OrangeTurret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

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
            'Back', ()=>{
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
