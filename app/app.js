'use strict';

// Declare app level module which depends on views, and components
angular.module('strengthTracker', [
  'ngRoute',
  'strengthTracker.workout',
  'strengthTracker.version',
  'strengthTracker.exerciseSelection'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/workout'});
}]).
factory('WorkoutService', function(){
  var model = {
    exercises:{
      "Bench Press":       { 
        name: "Bench Press",
        workouts : [
          {
            exercise:"Bench Press",
            date:"1/2/2015",
            oneRM:250,
            sets:[
              {
	        weight:200,
	        reps:8
              },
              {
	        weight:200,
	        reps:8
              }
            ]
          }
        ]
      },
      "Military Press": { 
        name: "Military Press"
      }
    }
  };
  model.selectedExercise = model.exercises["Bench Press"];
  var nullWorkout = {
    date:"Select a Workout"
  };
  model.selectedWorkout = nullWorkout;
  model.clearSelectedWorkout = function() {
    model.selectedWorkout = nullWorkout;
  };

  return model;
  
});


