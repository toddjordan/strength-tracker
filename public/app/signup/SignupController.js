'use strict';

var exerciseApp = angular.module('strengthTracker.signup', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupController'
  });

}]);

exerciseApp.controller('SignupController', ['$scope', '$rootScope', '$location', 'LoginService', function($scope, $rootScope, $location, loginService) {
  var onSuccess = function(data) {
    $rootScope.loggedInUser = data;
    $rootScope.$emit('loginSuccessEvent', data);
    $location.url("/");    
  };

  var onFailure = function(data) {
    $scope.isFailureState = true;
  };

  $scope.signupClicked = function() {
    loginService.signup($scope.userid, $scope.username, $scope.password, onSuccess, onFailure);
  };
  
}]);

