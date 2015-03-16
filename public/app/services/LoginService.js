'use strict';

function LoginService(http) {
  this.http = http;

  this.login = function(username, password, success, fail) {
    this.http.post('/auth/login', {username:username, password:password}).success(function(data, status, headers, config) {
      success(data);
    }).error(function(data, status, headers, config) {
      fail(data);
    });

  };

  this.logout = function(success) {
    this.http.post('/auth/logout').success(function() {
      success();
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
