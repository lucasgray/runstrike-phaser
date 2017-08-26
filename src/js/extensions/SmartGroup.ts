/**
 * This is a bridge to allow smart typescript types in and out of our group
 * while still using the Phaser.Group functionality to do pooling and group collisions
 *
 * Note: This will need augmented if more Phaser.Group methods are used!!
 */
export default class SmartGroup<T extends Phaser.Sprite> extends Phaser.Group {

    private tees: Array<T>;

    constructor(game: Phaser.Game) {
        super(game);

        this.physicsBodyType = Phaser.Physics.ARCADE;

        this.tees = [];
    }

    add(child: T, silent?: boolean, index?: number): void {
        super.add(child, silent, index);
        this.tees.push(child);
    }

    all(): Array<T> {
        return this.tees;
    }

}
