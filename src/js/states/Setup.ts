import Button from "../objects/Button";
import TurretHandler from "../handlers/setup/TurretHandler"
import Mission from "../missions/Mission";
import { GameState } from "../objects/GameData";
import Turret from "../objects/Turret";

export default class Setup extends Phaser.State {

    mission: Mission;
    gameState: GameState;
    backgroundSprite : Phaser.Sprite;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
        console.log("setup")
    }

    init(mission: Mission) {
        this.mission = mission;
        console.log("mission" + mission);
    }

    preload() {
    }

    create() {

        // this.objects = [];

        let background = this.game.add.sprite(this.mission.gridDescriptor.offsetX, 0, 'skirmish-background');//this.mission.background);
        background.width = this.mission.gridDescriptor.width;
        background.height = this.mission.gridDescriptor.height;
        this.game.world.sendToBack(background);
        background.inputEnabled = true;
        this.backgroundSprite = background;

        console.log(this.gameState.placedLoot);

        this.gameState.placedLoot.filter(it => it.mission === this.mission.name).forEach((it) => {

            //TODO factory or something
            if (it.type.toLowerCase() == 'turret') {
                let turret = new Turret(this.mission, this.game, (this.mission.gridDescriptor.offsetX + (it.x * this.mission.gridDescriptor.cellWidth)), it.y * this.mission.gridDescriptor.cellHeight);
                this.game.add.existing(turret);
            }

        });

        this.drawInputs();
    }

    drawInputs() {

        // Object.keys(setupInputHandlers).forEach((ih,index) => {
        //     new setupInputHandlers[ih](this.game, 50, 300 + (90 * index));
        // });
        let turretHandler = new TurretHandler(this.mission, [], this.gameState, this.backgroundSprite, this.game, 50, 300);

        new Button(
            this.game,
            100,
            this.game.height - 40,
            100,
            40,
            'Back', ()=>{
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
            'Defend', ()=>{
                console.log("asking to defend");
                this.state.start('Play');
            }
        );
    }
}
