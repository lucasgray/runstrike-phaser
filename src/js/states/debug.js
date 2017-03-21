import Buttons from "../extensions/Buttons";

export default class Debug extends Phaser.State {

    preload() {
    }

    create() {

        this.graphics = this.game.add.graphics(0, 0);

        if (typeof(DATA) !== "undefined") {
            this.text = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY - 200,
                "placed items: " + JSON.stringify(DATA.placed_loot), {
                    font: '14px monospace',
                    fill: 'white',
                    align: 'center'
                });
            this.text.anchor.setTo(0.5);
        } else {
            this.text = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY - 200,
                "NO DATA!!", {
                    font: '14px monospace',
                    fill: 'white',
                    align: 'center'
                });
            this.text.anchor.setTo(0.5);
        }

        Buttons.makeButton(
            this.game,
            100,
            this.game.height - 40,
            100,
            20,
            this.btnDownSound,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }
}
