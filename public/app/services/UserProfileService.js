function UserProfileService() {

  var nullUser = {name:''};
  var loggedInUser = nullUser;

  this.clearUser = function() {
    loggedInUser = nullUser;
  };

  this.isValidUser = function() {
    return loggedInUser !== nullUser;
  };

  this.getName = function() {
    return loggedInUser.name;
  };

  this.setLoggedInUser = function(user) {
    loggedInUser = user;
  };

  this.getLoggedInUser = function() {
    return loggedInUser;
  };

}
