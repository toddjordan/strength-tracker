'use strict';

var exerciseApp = angular.module('strengthTracker.userOptions', []);

exerciseApp.controller('UserOptionsController', ['$rootScope','$scope', '$location', 'UserProfileService', function($rootScope, $scope, $location, userProfileService) {
  $scope.items = [{text:'Logout',key:"logout"}];
  $scope.loggedInUser = userProfileService.getLoggedInUser();
  $scope.isLoggedIn = userProfileService.isValidUser();
  $rootScope.$on('loginSuccessEvent', function(event, user) {
    $scope.isLoggedIn = true;
    $scope.loggedInUser = user;
    userProfileService.setLoggedInUser(user);
  });
  var selectionHandlers = {
    logout:function() {
      userProfileService.clearUser();
      $scope.loggedInUser = userProfileService.getLoggedInUser();
      $scope.isLoggedIn = false;
      $location.url('/login');
      $rootScope.$emit('logoutEvent');
    }
  };
  $scope.handleSelected = function(key) {
    selectionHandlers[key]();
  };

}]);

