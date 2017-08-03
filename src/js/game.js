import * as states from './states';
import * as Phaser from "phaser-ce";

const GAME = new Phaser.Game(640, 960, Phaser.AUTO);

//TODO lots of things to revamp if we want to support high dpi :(
//const game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');
