import Button from "../models/sprites/Button";
import BlueTurretHandler from "../handlers/BlueTurretHandler"
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import BlueTurret from "../models/sprites/turrets/BlueTurret";
import GreenTurret from "../models/sprites/turrets/GreenTurret";
import GreenTurretHandler from "../handlers/GreenTurretHandler";
import InputHandler from "../handlers/InputHandler";
import YellowTurret from "../models/sprites/turrets/YellowTurret";
import RedTurret from "../models/sprites/turrets/RedTurret";
import OrangeTurret from "../models/sprites/turrets/OrangeTurret";
import RedTurretHandler from "../handlers/RedTurretHandler";
import OrangeTurretHandler from "../handlers/OrangeTurretHandler";
import YellowTurretHandler from "../handlers/YellowTurretHandler";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;
    backgroundSprite: Phaser.Sprite;

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
        this.backgroundSprite = spr;

        console.log(this.gameState.placedLoot);

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

        this.drawInputs();
    }

    drawInputs() {

        let allTurretHandlers = Array<InputHandler>();
        allTurretHandlers.push(new BlueTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 300));
        allTurretHandlers.push(new GreenTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 390));
        allTurretHandlers.push(new RedTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 480));
        allTurretHandlers.push(new OrangeTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 570));
        allTurretHandlers.push(new YellowTurretHandler(this.mission, this.gameState, allTurretHandlers, this.backgroundSprite, this.game, 50, 660));

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
    }
}
