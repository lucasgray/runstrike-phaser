export default class GameObject extends PIXI.DisplayObject {
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
