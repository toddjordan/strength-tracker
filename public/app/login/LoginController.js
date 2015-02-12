'use strict';

var exerciseApp = angular.module('strengthTracker.login', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}]);

exerciseApp.controller('LoginController', ['$scope', 'LoginService', function(sc, loginService) {
  
}]);

