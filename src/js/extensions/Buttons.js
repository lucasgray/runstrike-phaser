export default class Buttons {

    static makeButton(game,x,y,width,height,btnDownSound,label,callback) {

        let button = game.add.button(x,y,null,callback);
        button.width = width;
        button.height = height;
        button.anchor.setTo(0.5);
        button.setDownSound(btnDownSound);

        let graphics = game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xFF0000, 1);
        let rect = graphics.drawRect(
            x - (width/2),
            y - (height/2),
            width,
            height
        );

        // rect.anchor.setTo(0.5);

        let text = game.add.text(x, y, label, {
            font: 'Joystix',
            fill: 'white',
            align: 'center',
            fontSize: height * .7
        });
        text.anchor.setTo(0.5);


    }
}
