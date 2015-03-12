'use strict';

function UserProfileService() {

  var nullUser = {username:''};
  var loggedInUser = nullUser;

  this.clearUser = function() {
    loggedInUser = nullUser;
  };

  this.isValidUser = function() {
    return loggedInUser !== nullUser;
  };

  this.getName = function() {
    return loggedInUser.username;
  };

  this.setLoggedInUser = function(user) {
    loggedInUser = user;
  };

  this.getLoggedInUser = function() {
    return loggedInUser;
  };

}
