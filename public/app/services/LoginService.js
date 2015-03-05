function LoginService(http) {
  this.http = http;

  this.login = function(username, password, success, fail) {
    this.http.post('/login', {username:username, password:password}).success(function(data, status, headers, config) {
      success(data);
    }).error(function(data, status, headers, config) {
      fail(data);
    });

  };

  this.signup = function(userid, username, password, success, fail) {
    this.http.post('/users', {userid:userid, username:username, password:password}).success(function(data, status, headers, config) {
      success(data);
    }).error(function(data, status, headers, config) {
      fail(data);
    });
  };
}
