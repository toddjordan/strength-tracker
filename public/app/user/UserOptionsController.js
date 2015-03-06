'use strict';

var exerciseApp = angular.module('strengthTracker.userOptions', []);

exerciseApp.controller('UserOptionsController', ['$rootScope','$scope', 'UserProfileService', function($rootScope, $scope, userProfileService) {
  $scope.items = ['Logout'];
  $scope.loggedInUser = userProfileService.getLoggedInUser();
  $scope.isLoggedIn = userProfileService.isValidUser();
  $rootScope.$on('loginSuccessEvent', function(event, user) {
    $scope.isLoggedIn = true;
    $scope.loggedInUser = user;
    userProfileService.setLoggedInUser(user);
  });

}]);

