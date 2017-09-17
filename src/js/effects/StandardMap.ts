
export default class StandardMap {

    static AddMapEffects(game: Phaser.Game) : Phaser.Group {

        let s1 = game.add.sprite(0,0, 'scanlines');
        s1.alpha = .5;
        let s3 = game.add.sprite(0,0, 'grid');
        let s4 = game.add.sprite(0,0, 'border-blend');

        let grouped = new Phaser.Group(game);
        grouped.add(s1);
        grouped.add(s3);
        grouped.add(s4);

        return grouped;
    }
}
