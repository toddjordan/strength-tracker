'use strict';

var exerciseApp = angular.module('strengthTracker.userOptions', []);

exerciseApp.controller('UserOptionsController', ['$rootScope','$scope', 'UserProfileService', function($rootScope, sc, userProfileService) {
  sc.items = ['Logout'];
  sc.loggedInUser = userProfileService.getLoggedInUser();
  sc.isLoggedIn = userProfileService.isValidUser();
  $rootScope.$on('loginSuccessEvent', function(event, user) {
    sc.isLoggedIn = true;
    sc.loggedInUser = user;
    userProfileService.setLoggedInUser(user);
  });

}]);

