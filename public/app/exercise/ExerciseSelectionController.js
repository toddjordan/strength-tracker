'use strict';

var exerciseSelection = angular.module('strengthTracker.exerciseSelection',[]);

exerciseSelection.controller('ExerciseSelectionController', ['$scope','$modal','WorkoutService','ChartService', 'SelectionService', 'UserProfileService', function(sc, modal, workoutService, chartService, selectionModel, userProfileService) {
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
    modalInstance.result.then(function(exerciseName) {
      workoutService.createNewExercise(exerciseName, selectionModel, function() {
        sc.selectedItem = selectionModel.selectedExercise;
      });
    });

  };

  //setup remove button behavior
  sc.removeExercise = function() {
    var modalInstance = modal.open({ 
      templateUrl:"removeWarning.html",
      controller: 'RemoveExerciseController',
      size : 'sm'
    });
    modalInstance.result.then(function() {
      workoutService.removeExercise(selectionModel, function() {
        sc.selectedItem = selectionModel.selectedExercise;
      });
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
  sc.ok = function() {
    modalInstance.close(sc.exerciseName);
  };

  sc.cancel = function() {
    modalInstance.dismiss('cancel');
  };
}]);

exerciseSelection.controller('RemoveExerciseController', ['$scope', '$modalInstance', function(sc, modalInstance) {
  sc.remove = function() {
    modalInstance.close();
  };

  sc.cancelRemove = function() {
    modalInstance.dismiss('cancel');
  };
}]);

