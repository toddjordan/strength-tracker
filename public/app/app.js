'use strict';

// Declare app level module which depends on views, and components
angular.module('strengthTracker', [
  'ngRoute',
  'strengthTracker.workout',
  'strengthTracker.version',
  'strengthTracker.exerciseSelection',
  'strengthTracker.login',
  'angular-chartist',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/workout'});
}]).
run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if ($rootScope.user !== null && next.templateUrl !== "/login/login.html") {
      $location.path("/login/login.html") ;
    }
  });
}).
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
}).
factory('LoginService', function($http) {
  return new LoginService($http);
}).
factory('UserProfileService', function() {
  return new UserProfileService();
});


