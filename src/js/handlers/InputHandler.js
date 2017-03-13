export default class InputHandler {
    constructor(game) {
      this.game = game;
    }

    inputListener(){
    }

    action(pointer, doubleTap, sprite){
      // if sprite is populated, perform action on object. Else, perform action on pointer
      if(sprite){

      } else {

      }
    }

    isType(type){
      return this instanceof type;
    }

    addToGroup(groups){
      if(groups){
        groups.forEach((it) => it.push(this));
      }
    }
}
