import Button from "../models/sprites/Button";
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

        let handlers = this.drawInputs();

        this.drawSetupTurrets(handlers);
    }

    drawInputs() : Array<InputHandler> {

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

        return allTurretHandlers;
    }

    drawSetupTurrets(handlers: Array<InputHandler>) {

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            //TODO factory or something
            if (it.type.toLowerCase() == 'blue-turret') {
                let turret = new BlueSetupTurret(
                    this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'blue-turret'));
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'green-turret') {
                let turret = new GreenSetupTurret(
                    this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'green-turret'));
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'yellow-turret') {
                let turret = new YellowSetupTurret(
                    this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'yellow-turret'));
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'red-turret') {
                let turret = new RedSetupTurret(
                    this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'red-turret'));
                this.game.add.existing(turret);
            }

            if (it.type.toLowerCase() == 'orange-turret') {
                let turret = new OrangeSetupTurret(
                    this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'orange-turret'));
                this.game.add.existing(turret);
            }
        });

    }
}
