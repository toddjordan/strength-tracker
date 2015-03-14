'use strict';

var workoutState = function WorkoutState(exercise, dbClient) {
  
  return {
    setup:function() {
      dbClient.insert('exercises', exercise, function(result) {
        console.log('inserted exercise %s', exercise.name);
      });
    },
    teardown:function() {
      dbClient.remove('exercises', {name:exercise.name, userid:exercise.userid}, function(result) {
        console.log('removed exercise %s', exercise.name);
      });
    }
  };
};


module.exports = workoutState;

