function UserProfileService() {

  var nullUser = {};
  this.loggedInUser = nullUser;

  this.clearUser = function() {
    this.loggedInUser = nullUser;
  };

  this.isValidUser = function() {
    return this.loggedInUser !== nullUser;
  };
}
