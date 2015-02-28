'use strict';

var exerciseApp = angular.module('strengthTracker.signup', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupController'
  });

}]);

exerciseApp.controller('SignupController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {

  $scope.signupClicked = function() {
    //call regisration service, on success log the user in
    $location.url("/");
  };
  
}]);

