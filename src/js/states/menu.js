export default class Menu extends Phaser.State {

    create() {

        this.game.music = this.game.add.audio('futureMusic');
        this.graphics = this.game.add.graphics(0, 0);
        this.btnDownSound = this.add.sound('menuDown');

        this.title = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY-200,
            "Your hideout", {
            font: '50px Joystix',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        this.makeButton(
            this.game.world.centerX,
            this.game.world.centerY,
            this.game.width * .8,
            60,
            'setup defenses', ()=>{
                console.log("asking to setup");
                this.state.start('Setup');
            }
        );

        this.makeButton(
            this.game.world.centerX,
            this.game.world.centerY+70,
            this.game.width * .8,
            60,
            'defend', ()=>{
                console.log("asking to start play!");
                this.state.start('Play');
            }
        );

        // this.btnOverSound = this.add.sound('menuOver');
        // this.btnOutSound = this.add.sound('menuOut');
        // this.btnDownSound = this.add.sound('menuDown');
        //
        // this.start.setOverSound(this.btnOverSound);
        // this.start.setOutSound(this.btnOutSound);
        // this.start.setDownSound(this.btnDownSound);

        // this.start.onInputUp.add();

        // this.menuPanel = this.add.group();
        // this.menuPanel.add(this.title);
        // this.menuPanel.add(this.title2);
        // this.menuPanel.add(this.start);

        // this.game.music.loopFull();

    }

    makeButton(x,y,width,height,label,callback) {

        let button = this.game.add.button(x,y,null,callback);
        button.width = width;
        button.height = height;
        button.anchor.setTo(0.5);
        button.setDownSound(this.btnDownSound);

        this.graphics.lineStyle(2, 0xFF0000, 1);
        let rect = this.graphics.drawRect(
            x - (width/2),
            y - (height/2),
            width,
            height
        );

        // rect.anchor.setTo(0.5);

        let text = this.game.add.text(x, y, label, {
            font: 'Joystix',
            fill: 'white',
            align: 'center',
            fontSize: height * .7
        });
        text.anchor.setTo(0.5);


    }
}
