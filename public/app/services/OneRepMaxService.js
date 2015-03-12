'use strict';

function OneRepMaxService() {

  this.calculate = function(weight, reps) {
    if (weight===0||reps===0) {
      return 0;
    }
    var rawResult = applyEquation(weight, reps);
    var roundedResult = Math.round(rawResult * 100)/100;
    return roundedResult;
  };

  var applyEquation = function(weight, reps) {
    return reps>1?weight * (1 + reps/30):weight;
  };
}
