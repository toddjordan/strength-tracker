'use strict';

var exerciseSelection = angular.module('strengthTracker.exerciseSelection',[]);

exerciseSelection.controller('ExerciseSelectionController', ['$scope','WorkoutService', function(sc, workoutService) {
  sc.items = workoutService.exercises;
  sc.selectedItem = workoutService.selectedExercise;
  sc.$watch('selectedItem',function(newValue, oldValue){
    workoutService.selectedExercise = newValue;
    workoutService.clearSelectedWorkout();
  });
}]);
