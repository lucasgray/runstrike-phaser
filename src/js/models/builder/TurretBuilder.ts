import Mission from "../../missions/Mission";
import {GameState} from "../state/GameData";
import InputHandler from "../../handlers/InputHandler";
import {
    BlueSetupTurret, GreenSetupTurret, OrangeSetupTurret, RedSetupTurret,
    YellowSetupTurret
} from "../sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import {BlueTurret, GreenTurret, OrangeTurret, RedTurret, YellowTurret} from "../sprites/turrets/Turrets";

export default class TurretBuilder {

    // this.mission, this.game, this.gameState, it.row, it.col, _.find(handlers, s => s.lootType === 'blue-turret'));

    mission: Mission;
    game: Phaser.Game;
    gameState: GameState;
    row: number;
    col: number;
    inputHandlers: Array<InputHandler>;

    withGame(game: Phaser.Game) {
        this.game = game;
        return this;
    }

    andState(gameState: GameState) {
        this.gameState = gameState;
        return this;
    }

    andMission(mission: Mission) {
        this.mission = mission;
        return this;
    }

    andInputHandlers(inputHandlers: Array<InputHandler>) {
        this.inputHandlers = inputHandlers;
        return this;
    }

    at(at: {row: number, col: number}) {
        this.row = at.row;
        this.col = at.col;

        return this;
    }

    buildForSetup(type: string) {

        if (type.toLowerCase() == 'blue-turret') {
            return new BlueSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, _.find(this.inputHandlers, s => s.lootType === 'blue-turret'));
        }

        if (type.toLowerCase() == 'green-turret') {
            return new GreenSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, _.find(this.inputHandlers, s => s.lootType === 'green-turret'));
        }

        if (type.toLowerCase() == 'yellow-turret') {
            return new YellowSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, _.find(this.inputHandlers, s => s.lootType === 'yellow-turret'));
        }

        if (type.toLowerCase() == 'red-turret') {
            return new RedSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, _.find(this.inputHandlers, s => s.lootType === 'red-turret'));
        }

        if (type.toLowerCase() == 'orange-turret') {
            return new OrangeSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, _.find(this.inputHandlers, s => s.lootType === 'orange-turret'));
        }
    }

    buildForPlay(type: string) {
        if (type.toLowerCase() == 'blue-turret') {
            return new BlueTurret(this.mission, this.game, this.row, this.col);
        }

        if (type.toLowerCase() == 'green-turret') {
            return new GreenTurret(this.mission, this.game, this.row, this.col);
        }

        if (type.toLowerCase() == 'yellow-turret') {
            return new YellowTurret(this.mission, this.game, this.row, this.col);
        }

        if (type.toLowerCase() == 'red-turret') {
            return new RedTurret(this.mission, this.game, this.row, this.col);
        }

        if (type.toLowerCase() == 'orange-turret') {
            return new OrangeTurret(this.mission, this.game, this.row, this.col);
        }
    }
}
