'use strict';

var exerciseApp = angular.module('strengthTracker.userOptions', []);

exerciseApp.controller('UserOptionsController', ['$scope', 'UserProfileService', function(sc, userProfileService) {
  sc.items = ['Logout'];
  sc.loggedInUser = userProfileService.loggedInUser;
  sc.isLoggedIn = userProfileService.isValidUser();
  sc.$watch('loggedInUser', function(oldValue, newValue) {
    sc.isLoggedIn = userProfileService.isValidUser();
  });
}]);

