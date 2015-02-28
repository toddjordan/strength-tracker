'use strict';

// Declare app level module which depends on views, and components
angular.module('strengthTracker', [
  'ngRoute',
  'strengthTracker.workout',
  'strengthTracker.version',
  'strengthTracker.exerciseSelection',
  'strengthTracker.userOptions',
  'strengthTracker.login',
  'strengthTracker.signup',
  'angular-chartist',
  'ui.bootstrap'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/workout'});
  $httpProvider.interceptors.push(function($q, $location) {
    return {
      response: function(response) {
        //on success
        return response;
      },
      responseError: function(response) {
        if (response.status == 401) {
          $location.url('/login');
        }
        return $q.reject(response);
      }
    };
  });
}]).
run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (typeof $rootScope.loggedInUser == 'undefined' && next.templateUrl != "login/login.html" && next.templateUrl != "signup/signup.html") {
      console.log("redirect to login");
      $location.path("/login");        
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


