import Button from "../objects/Button";
import 'phaser';
import Mission from "../missions/Mission";
import {GameState} from "../objects/GameData";
import Turret from "../objects/Turret";
import Drone from "../objects/Drone";
import CocktailHandler from "../handlers/CocktailHandler";

export default class Play extends Phaser.State {

    gameState : GameState;
    mission : Mission;
    backgroundSprite: Phaser.Sprite;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;


    }

    init(mission: Mission, gameState: GameState) {

        console.log('init mission');

        this.mission = mission;
        this.gameState = gameState;

        mission.enemies = this.game.add.group(this,"enemies", true, true, Phaser.Physics.ARCADE);
        mission.bullets = this.game.add.group(this,"bullets", true, true, Phaser.Physics.ARCADE);

        let spr = this.mission.background();
        this.game.add.existing(spr);
        spr.sendToBack();
        this.backgroundSprite = spr;

        //TODO refactor this into something
        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            //TODO factory or something
            if (it.type.toLowerCase() == 'turret') {
                let turret = new Turret(this.mission, this.game, it.row, it.col);
                this.game.add.existing(turret);
            }

        });

        this.mission.recalculateGrid();

        this.drawHealth();
        this.drawInput();

        this.game.add.existing(new Drone(this.game, this.mission, 5, 0));
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

        new CocktailHandler(this.mission, this.gameState, this.backgroundSprite, this.game, 50, 300);

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
    }
}
