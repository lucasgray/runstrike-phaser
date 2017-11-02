import InputHandler from "./InputHandler";
import Mission from "../missions/Mission";
import {GameState} from "../models/state/GameData";
import * as _ from 'lodash';
import Turret from "../models/sprites/turrets/Turret";

export default class WrenchHandler extends InputHandler {

    icon: string = 'auto-turret-ui';
    lootType: string = 'wrench';
    lootPrettyName: 'wrench';

    constructor(mission: Mission,
                gameState: GameState,
                allHandlers: InputHandler[],
                allTurrets: Turret[],
                game: Phaser.Game,
                x: number,
                y: number) {

        super(mission, gameState, allHandlers, allTurrets, game, x, y);

        super.paint();
        this.adjustScale();
    }

    adjustScale() {
        let defaultSize = {width: 64, height: 73};
        let scaleX = (this.mission.gridDescriptor.cellWidth / defaultSize.width);
        let scaleY = (this.mission.gridDescriptor.cellHeight / defaultSize.height);
        this.parentSprite.scale.setTo(scaleX, scaleY);
    }

    action(sprite: Phaser.Sprite, pointer: Phaser.Pointer) {

        let loot = _.find(this.gameState.inventoryLoot, i => i.type === this.lootType);

        if (loot !== undefined && loot.amount > 0) {
            sprite.heal(500);
            this.gameState.useItem(this.lootType);
            this.text.setText(this.num());
        } else {
            let cantplace = this.game.add.audio('wrong-choice');
            cantplace.play();
        }
    }
}
