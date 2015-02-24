function UserProfileService() {

  var nullUser = {name:''};
  this.loggedInUser = nullUser;

  this.clearUser = function() {
    this.loggedInUser = nullUser;
  };

  this.isValidUser = function() {
    return this.loggedInUser !== nullUser;
  };

  this.getName = function() {
    return this.loggedInUser.name;
  };
}
