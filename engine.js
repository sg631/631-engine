"use strict";
function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
function radiansToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}
function posToAngle(ob1, ob2) {
  return Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x) * 180 / Math.PI;
}
function angleDistanceToX(ob, angle, distance) {
  var radians = degreesToRadians(angle);
  return ob.x + distance * Math.cos(radians);
}
function angleDistanceToY(ob, angle, distance) {
  var radians = degreesToRadians(angle);
  return ob.y + distance * Math.sin(radians);
}
function distanceBetween(ob1, ob2) {
  return Math.sqrt(Math.pow(ob2.x - ob1.x, 2) + Math.pow(ob2.y - ob1.y, 2));
  }
class PFObject {
  constructor(name, width, height, color, x, y, type) {
    this.div = document.createElement("div");
    this.type = type;
    switch (type) {
      case 'static':
      case 'dynamic':
      case 'kinematic':
      case 'ui':
        this.velx = 0;
        this.vely = 0;
        break;
      default:
        this.velx = 0;
        this.vely = 0;
        break;
    }
    setInterval(() => {
      if (this.div != undefined){
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.x += this.velx;
        this.y += this.vely;
        if (typeof this.everyFrameCode == "function"){
          this.everyFrameCode();
        }
      }
    }, 1000 / 60);
    this.isCollidingWith = function(otherObject, responseMode) {
      //Find if the objects are colliding
      var x1 = this.x;
      var y1 = this.y;
      var x2 = otherObject.x;
      var y2 = otherObject.y;
      var width1 = this.width;
      var height1 = this.height;
      var width2 = otherObject.width;
      var height2 = otherObject.height;
      var colliding = false;
      if (x1 + width1 > x2 && x1 < x2 + width2 && y1 + height1 > y2 && y1 < y2 + height2){
        colliding = true;
      }
      if (responseMode == "none"){
        return colliding;
      }
      if (responseMode == "push"){
        if (colliding){
          if (x1 + width1 > x2){
            this.x = x2 - width1;
            this.velx = 0;
          }
          if (x1 < x2 + width2){
            this.x = x2 + width2;
            this.velx = 0;
          }
          if (y1 + height1 > y2){
            this.y = y2 - height1;
            this.vely = 0;
          }
          if (y1 < y2 + height2){
            this.y = y2 + height2;
            this.vely = 0;
          }
        }
      }  
    };
    this.name = name;
    this.id = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.div.id = name;
    this.div.style.position = "absolute";
    this.div.style.left = x + "px";
    this.div.style.top = y + "px";
    this.div.style.width = width + "px";
    this.div.style.height = height + "px";
    this.div.style.backgroundColor = color;
    this.everyFrameCode = null;
    document.body.appendChild(this.div);
  }
}