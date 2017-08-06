import * as Phaser from "phaser-ce";
import Boot from './states/Boot'

const game = new Phaser.Game(640, 960, Phaser.AUTO);

//TODO lots of things to revamp if we want to support high dpi :(
//const game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

//make all the states with our global game state
game.state.add('Boot', new Boot());

game.state.start('Boot');




