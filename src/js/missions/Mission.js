export default class Mission {
    constructor(game) {
      this.game = game;
    }

    update(objects){
    }

    shutdown(){
      this.game.stage.backgroundColor = this.previousBackground;
    }
}
