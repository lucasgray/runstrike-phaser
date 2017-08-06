"use strict";
exports.__esModule = true;
//"Master" Object
var GameObject_1 = require("./GameObject");
exports.GameObject = GameObject_1["default"];
//Game Objects, inherits from GameObject
var MapObject_1 = require("./MapObject");
exports.MapObject = MapObject_1["default"];
var EnemyObject_1 = require("./EnemyObject");
exports.EnemyObject = EnemyObject_1["default"];
var StoryObject_1 = require("./StoryObject");
exports.StoryObject = StoryObject_1["default"];
//Map Objects, inherits from MapObject
var Turret_1 = require("./Turret");
exports.Turret = Turret_1["default"];
var Wall_1 = require("./Wall");
exports.Wall = Wall_1["default"];
var Bullet_1 = require("./Bullet");
exports.Bullet = Bullet_1["default"];
//Enemy Objects, inherits from EnemyObject
var Drone_1 = require("./Drone");
exports.Drone = Drone_1["default"];
//Enemy Objects, inherits from StoryObject
var Dialogue_1 = require("./Dialogue");
exports.Dialogue = Dialogue_1["default"];
var Intro_1 = require("./Intro");
exports.Intro = Intro_1["default"];
var Caption_1 = require("./Caption");
exports.Caption = Caption_1["default"];
//# sourceMappingURL=index.js.map