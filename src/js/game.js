import * as states from './states';
const GAME = new Phaser.Game(640, 960, Phaser.AUTO);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');
