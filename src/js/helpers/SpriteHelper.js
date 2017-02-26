export default class SpriteHelper {

    static drawTurret(game, x, y, callback) {

        //just some fudge because i cut the current turret bottom badly..
        let g = game.add.sprite(x+35, y+33, 'turret-bottom');
        // g.anchor.y = -.1;
        g.inputEnabled = true;
        g.anchor.setTo(0.5);

        let h = game.add.sprite(0, -15, 'turret-top');
        h.anchor.setTo(0.5);
        h.inputEnabled = true;
        g.addChild(h);

        if (callback) {
            h.events.onInputDown.add(callback, game);
        }

        return g;
    }
}
