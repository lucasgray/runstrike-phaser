import Mission from "../../missions/Mission";
import {GameState} from "../state/GameData";
import InputHandler from "../../handlers/InputHandler";
import {AutoSetupTurret} from "../sprites/turrets/setup/SetupTurrets";
import * as _ from 'lodash';
import {AutoTurret} from "../sprites/turrets/Turrets";

export default class TurretBuilder {

    mission: Mission;
    game: Phaser.Game;
    gameState: GameState;
    row: number;
    col: number;
    curHealth: number;
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

    withCurrentHealth(curHealth: number) {
        this.curHealth = curHealth;

        return this;
    }

    buildForSetup(type: string) {

        if (type.toLowerCase() == 'auto_turret') {
            return new AutoSetupTurret(
                this.mission, this.game, this.gameState, this.row, this.col, this.curHealth, _.find(this.inputHandlers, s => s.lootType === 'auto_turret')!);
        }
    }

    buildForPlay(type: string) {

        if (type.toLowerCase() == 'auto_turret') {
            return new AutoTurret(this.mission, this.game, this.row, this.col, this.curHealth);
        }
    }
}
