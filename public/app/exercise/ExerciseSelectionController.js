'use strict';

var exerciseSelection = angular.module('strengthTracker.exerciseSelection',[]);

exerciseSelection.controller('ExerciseSelectionController', ['$scope', '$rootScope', '$modal','WorkoutService','ChartService', 'SelectionService', 'UserProfileService', function($scope, $rootScope, $modal, workoutService, chartService, selectionModel, userProfileService) {
  $scope.isValidUser = userProfileService.isValidUser();
  var setExercises = function() {
    $scope.items = workoutService.exercises;
    $scope.selectedItem = selectionModel.selectedExercise;
  };

  //seed workout data on initial load
  workoutService.fetchData(setExercises, selectionModel);

  $rootScope.$on('loginSuccessEvent', function(event, args) {
    workoutService.fetchData(setExercises, selectionModel);
    $scope.isValidUser = true;
  });

  $rootScope.$on('logoutEvent',function(event, args) {
    $scope.isValidUser = false;
    selectionModel.clearAllWorkouts();
  });

  //setup add button behavior
  $scope.launchAddModal = function() {
    var modalInstance = $modal.open({
      templateUrl:'myModalContent.html',
      controller: 'AddExerciseController',
      size: 'sm'
    });
    modalInstance.result.then(function(exerciseName) {
      workoutService.createNewExercise(exerciseName, selectionModel, function() {
        $scope.selectedItem = selectionModel.selectedExercise;
      });
    });
  };

  //setup remove button behavior
  $scope.removeExercise = function() {
    var modalInstance = $modal.open({ 
      templateUrl:"removeWarning.html",
      controller: 'RemoveExerciseController',
      size : 'sm'
    });
    modalInstance.result.then(function() {
      workoutService.removeExercise(selectionModel, function() {
        $scope.selectedItem = selectionModel.selectedExercise;
      });
    });
  };

  //watch for when a new item is selected to update the rest of the screen
  $scope.$watch('selectedItem',function(newValue, oldValue){
    selectionModel.selectedExercise = newValue;
    selectionModel.clearSelectedWorkout();
    chartService.applyNewExercise(newValue);
  });
}]);

exerciseSelection.controller('AddExerciseController', ['$scope', '$modalInstance', function($scope, modalInstance) {
  $scope.ok = function() {
    modalInstance.close($scope.exerciseName);
  };

  $scope.cancel = function() {
    modalInstance.dismiss('cancel');
  };
}]);

exerciseSelection.controller('RemoveExerciseController', ['$scope', '$modalInstance', function($scope, modalInstance) {
  $scope.remove = function() {
    modalInstance.close();
  };

  $scope.cancelRemove = function() {
    modalInstance.dismiss('cancel');
  };
}]);

