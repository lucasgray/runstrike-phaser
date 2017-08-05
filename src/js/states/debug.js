import Button from "../extensions/Button";

export default class Debug extends Phaser.State {

    preload() {
    }

    create() {

        this.graphics = this.game.add.graphics(0, 0);

        if (typeof(this.game.gameData) !== "undefined") {
            var textOne = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY - 200,
                "placed items: " + JSON.stringify(this.game.gameData.placedItems), {
                    font: '14px monospace',
                    fill: 'white',
                    align: 'center',
                    width: 100
                });
            textOne.anchor.setTo(0.5);

            var textTwo = this.game.add.text(
                this.game.world.centerX,
                this.game.world.centerY - 400,
                "unused items: " + JSON.stringify(this.game.gameData.inventoryItems), {
                    font: '14px monospace',
                    fill: 'white',
                    align: 'center',
                    width: 100
                });

            textTwo.anchor.setTo(0.5);
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

        new Button(
            this.game,
            100,
            this.game.height - 120,
            100,
            30,
            'back', ()=>{
                console.log("asking to go to menu");
                this.state.start('Menu');
            }
        );
    }
}
