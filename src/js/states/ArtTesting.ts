

import {GameState} from "../models/state/GameData";

export default class ArtTesting extends Phaser.State {

    gameState : GameState;

    constructor(gameState: GameState) {
        super();
        this.gameState = gameState;
    }

    create() {
        let s = this.game.add.sprite(0,0, 'wasteland-craters');
        let b = this.game.add.sprite(0,0, 'building-01');
        b.tint = 0x71e64a;
        let base = this.game.add.sprite(640/2 - (64 *2),960-(64*3), 'base');
        base.tint = 0xe64abf;

        let s5 = this.game.add.sprite(64*3,64*7, 'turret-base');
        s5.tint = 0xfffff;

        let shadow = this.game.add.sprite(64*3 + 32 + 7 -4, 64*7 + 32 - 12+2, 'turret-1');
        shadow.anchor.set(0.5);
        shadow.tint = 0x191919;
        shadow.alpha = 0.6;

        let s6 = this.game.add.sprite(64*3 + 32 + 7,64*7 + 32 - 12, 'turret-1');
        s6.anchor.setTo(.5);
        s6.tint = 0xfffff;



        // let s2 = this.game.add.sprite(0,0, 'screen-glare');
        // s2.alpha = .1;
        // let s4 = this.game.add.sprite(0,0, 'border-blend');




    }


}
