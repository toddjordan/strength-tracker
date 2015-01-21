'use strict';

var exerciseApp = angular.module('strengthTracker.workout', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/workout', {
    templateUrl: 'workout/workout.html',
    controller: 'WorkoutController'
  });
}]);

exerciseApp.controller('WorkoutController', ['$scope', 'WorkoutService', function(sc, workoutService) {
  sc.model = workoutService;
  sc.addSetHidden=true;

  sc.handleEditToggle = function(workout) {
    if (sc.model.selectedWorkout === workout) {
      workoutService.clearSelectedWorkout();
      //hide add set button
      sc.addSetHidden=true;
    } else {
      sc.model.selectedWorkout = workout;
      //show add set button
      sc.addSetHidden=false;
    }
    
  };

  sc.isWorkoutSelected = function(workout) {
    return workout == sc.model.selectedWorkout;
  };

  sc.removeWorkout = function(workouts, index) {
    workouts.splice(index, 1);
  };

  sc.addNewWorkout = function(workouts) {
    //Add a new workout to the front of the array
    var newWorkout = {};
    newWorkout.sets=[];
    workouts.unshift(newWorkout);
    var now = new Date();
    workouts[0].date=now.getMonth()+1 +"/"+now.getDate()+"/"+now.getFullYear();
  };

  sc.addNewSet = function(sets) {
    //Add a new set to the end of the array
    sets.push({});
  };

  sc.removeSet = function(sets, index) {
    //remove given set from model
    sets.splice(index,1);
  };

}]);
