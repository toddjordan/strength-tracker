'use strict';

var exerciseApp = angular.module('strengthTracker.login', ['ngRoute']);

exerciseApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}]);

exerciseApp.controller('LoginController', ['$scope', 'LoginService', '$location', function(sc, loginService, location) {
  var onSuccess = function(data) {
    location.url('/');
  };
  var onFailure = function(data) {
    //display login failed message
  };
  sc.loginClicked = function() {
    loginService.login(sc.username, sc.password, onSuccess, onFailure);
  };
}]);

