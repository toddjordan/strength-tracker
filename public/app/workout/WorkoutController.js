'use strict';

var exerciseApp = angular.module('strengthTracker.workout', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/workout', {
    templateUrl: 'workout/workout.html',
    controller: 'WorkoutController'
  });
}]);

exerciseApp.controller('WorkoutController', ['$scope', 'WorkoutService', 'OneRepMaxService', 'ChartService', 'SelectionService', function(sc, workoutService, oneRepMaxService, chartService, selectionService) {
  sc.model = workoutService;
  sc.selectionModel = selectionService;
  sc.addSetHidden=true;
  sc.oneRMChartData = chartService.getOneRMChartData();

  sc.handleEditToggle = function(workout) {
    if (sc.selectionModel.selectedWorkout === workout) {
      selectionService.clearSelectedWorkout();
      //hide add set button
      sc.addSetHidden=true;
    } else {
      sc.selectionModel.selectedWorkout = workout;
      //show add set button
      sc.addSetHidden=false;
    }
  };

  sc.isWorkoutSelected = function(workout) {
    return workout === sc.selectionModel.selectedWorkout;
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
    workouts[0].oneRM=0;
  };

  sc.addNewSet = function(sets) {
    //Add a new set to the end of the array
    sets.push({});
  };

  sc.removeSet = function(sets, index) {
    //remove given set from model
    sets.splice(index,1);
  };

  //changing set data causes 1rm to change and charts to update accordingly
  sc.onSetChange = function(set, exercise) {
    set.oneRM = oneRepMaxService.calculate(set.weight, set.reps);
    if(set.oneRM > exercise.oneRM) {
      exercise.oneRM = set.oneRM;
    }
    sc.oneRMChartData = chartService.getOneRMChartData();
    workoutService.updateExercise(selectionService);
  };


}]);
