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
  var workoutService = new WorkoutService();
  workoutService.fetchData();
  return workoutService;
}).
factory('OneRepMaxService', function() {
  return new OneRepMaxService();
});


