
export default class StandardMap {

    static AddMapEffects(game: Phaser.Game) : Phaser.Group {

        let s1 = game.add.tileSprite(0, 0, game.width, game.height, 'scanlines');
        s1.alpha = .5;
        s1.blendMode = PIXI.blendModes.MULTIPLY;
        let s3 = game.add.sprite(0,0, 'grid');
        let s4 = game.add.sprite(0,0, 'border-blend');
        s4.alpha = .75;
        let s5 = game.add.sprite(0,0, 'screen-glare');
        s5.blendMode = PIXI.blendModes.SOFT_LIGHT;

        let grouped = new Phaser.Group(game);
        grouped.add(s1);
        grouped.add(s3);
        grouped.add(s4);

        return grouped;
    }
}
