import 'phaser';
import Boot from './states/Boot'

const game = new Phaser.Game(640, 960, Phaser.CANVAS);


//TODO lots of things to revamp if we want to support high dpi :(
//const game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

game.state.add('Boot', new Boot());

game.state.start('Boot');



