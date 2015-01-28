'use strict';

var exerciseSelection = angular.module('strengthTracker.exerciseSelection',[]);

exerciseSelection.controller('ExerciseSelectionController', ['$scope','$modal','WorkoutService','ChartService', 'SelectionService', function(sc, modal, workoutService, chartService, selectionModel) {
  //seed workout data on load
  workoutService.fetchData(function() {
    sc.items = workoutService.exercises;
    sc.selectedItem = selectionModel.selectedExercise;
  }, selectionModel);

  //setup add button behavior
  sc.launchAddModal = function() {
    var modalInstance = modal.open({
      templateUrl:'myModalContent.html',
      controller: 'AddExerciseController',
      size: 'sm'
    });
    modalInstance.result.then(function() {
      //chosen
    }, function() {
      //dismissed
    });
  };

  //watch for when a new item is selected to update the rest of the screen
  sc.$watch('selectedItem',function(newValue, oldValue){
    selectionModel.selectedExercise = newValue;
    selectionModel.clearSelectedWorkout();
    chartService.applyNewExercise(newValue);
  });
}]);

exerciseSelection.controller('AddExerciseController', ['$scope', '$modalInstance', function(sc, modalInstance) {
  sc.add = function() {
    modalInstance.close({});
  };

  sc.cancel = function() {
    modalInstance.dismiss('cancel');
  };
}]);

