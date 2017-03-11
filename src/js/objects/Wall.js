import MapObject from './MapObject';

export default class Wall extends MapObject {

    constructor(game, x, y, groups) {
        super();
        var g = game.add.graphics(0, 0);
        g.lineStyle(2, 0x0000FF, 0.5);
        g.beginFill(0x0000FF, 1);
        g.drawRect(x, y, 64, 64); //no anchor, need to move it!
        g.endFill();
        g.inputEnabled = true;
        g.events.onInputDown.add(()=>{console.log('wall clicked!')}, g);
        this.addToGroup(groups);
    }
}
