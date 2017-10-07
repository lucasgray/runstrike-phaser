import 'phaser';
import Boot from './states/Boot'

const game = new Phaser.Game({width: 640, height: 960, renderer: Phaser.CANVAS, scaleMode: Phaser.ScaleManager.EXACT_FIT});


//TODO lots of things to revamp if we want to support high dpi :(
// const game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

game.state.add('Boot', new Boot());

game.state.start('Boot');

// alert(window.outerWidth);
