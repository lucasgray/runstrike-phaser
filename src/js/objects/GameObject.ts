export default class GameObject extends Phaser.Sprite {
    constructor() {
      super();
    }

    isType(type){
      return this instanceof type;
    }

    preUpdate(){
    }

    update(){
    }

    postUpdate(){
    }

    addToGroup(groups){
      if(groups){
        groups.forEach((it) => it.push(this));
      }
    }
}
