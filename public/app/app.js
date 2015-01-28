'use strict';

// Declare app level module which depends on views, and components
angular.module('strengthTracker', [
  'ngRoute',
  'strengthTracker.workout',
  'strengthTracker.version',
  'strengthTracker.exerciseSelection',
  'angular-chartist',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/workout'});
}]).
  factory('WorkoutService',  function($http){
    var workoutService = new WorkoutService($http);
    return workoutService;
  }).
factory('OneRepMaxService', function() {
  return new OneRepMaxService();
}).
factory('ChartService', function() {
  return new ChartService();
}).
factory('SelectionService', function() {
  return new SelectionService();
});


