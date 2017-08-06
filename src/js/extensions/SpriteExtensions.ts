export default class SpriteExtensions {
    alignInParent = function(sprite: Phaser.Sprite, parent: Phaser.Sprite, position?: number, offsetX?: number, offsetY?: number) {

        let s = parent.scale;
        parent.scale.setTo(1);

        sprite.alignIn(parent, position, offsetX, offsetY);

        sprite.left -= parent.left + (parent.width * parent.anchor.x);
        sprite.top -= parent.top + (parent.height * parent.anchor.y);

        parent.scale = s;
    };
}
