'use strict';

describe('In the Login module,', function() {

  var loginService = {
    login:function(userid, password, onSuccess, onFailure) {}

  };

  var location = {
    url: function() {}
  };

  var loginController, scope;


  beforeEach(function() {
    module('strengthTracker.login');
    module(function($provide) {
      $provide.value('LoginService', loginService);
      $provide.value('$location', location);
    });
  });

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    loginController = function() {
      return $controller('LoginController', {'$scope': scope, '$rootScope':$rootScope, 'LoginService':loginService});
    };
    scope.vm = loginController;
  }));

  beforeEach(function() {
    scope.username="todd.jordan";
    scope.password="myPassword";
  });


  
  describe('submitting', function() {
    it('should submit a login request', function() {
      spyOn(loginService, 'login');
      loginController();
      scope.loginClicked();
      expect(loginService.login).toHaveBeenCalledWith('todd.jordan', "myPassword", jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('successful login', function() {
    it('should redirect to root url', function() {      
      spyOn(location, 'url');
      spyOn(loginService, 'login');
      loginController();
      scope.loginClicked();
      loginService.login.calls.argsFor(0)[2]({userid:"todd.jordan", username:"Todd Jordan"});
      expect(location.url).toHaveBeenCalled();

    });
  });

  describe('failed login', function() {
    it('should set failed status to scope', function() {

    });
  });
});
