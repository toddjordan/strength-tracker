'use strict';

var exerciseApp = angular.module('strengthTracker.login', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}]);

exerciseApp.controller('LoginController', ['$scope', '$rootScope', 'LoginService', '$location', function($scope, $rootScope, loginService, location) {
  var failedLoginAttemptMessage = { type: 'danger', msg: 'Login failed due to an incorrect username or password.' };
  var onSuccess = function(data) {
    $rootScope.loggedInUser = data;
    $scope.alerts.splice(0, $scope.alerts.length);
    $rootScope.$emit('loginSuccessEvent', data);
    location.url('/');
  };
  var onFailure = function(data) {
    $scope.alerts.push(failedLoginAttemptMessage);
  };
  $scope.alerts = [];
  $scope.loginClicked = function() {
    loginService.login($scope.username, $scope.password, onSuccess, onFailure);
  };
  $scope.signup = function() {
    location.url('/signup');
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}]);

