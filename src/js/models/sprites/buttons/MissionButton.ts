

import Button from "./Button";
import SpriteExtensions from "../../../extensions/SpriteExtensions";

export default class MissionButton extends Button {

    constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, label: string,
                callback: Function, isBeat: boolean, isLocked: boolean) {
        super(game, x, y, width, height, label, callback);

        this.paintMission(isBeat, isLocked);
    }

    paintMission(isBeat: boolean, isLocked: boolean) {

        if (isBeat) {
            let trophy = this.game.add.sprite(0, 0, 'pico-icons', 78);

            this.baseSprite.addChild(trophy);

            trophy.x = trophy.x - (this.width / 2) + 25;
            trophy.scale.setTo(4);
            trophy.anchor.setTo(.5);
        }

        if (isLocked) {
            let lock = this.game.add.sprite(0, 0, 'pico-icons', 39);

            this.baseSprite.addChild(lock);

            lock.x = lock.x - (this.width / 2) + 25;
            lock.scale.setTo(4);
            lock.anchor.setTo(.5);

        }
    }

}
