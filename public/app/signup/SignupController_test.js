'use strict';

describe('In the Signup module,', function() {

  var loginService = {
    signup:function(userid, username, password, onSuccess, onFailure) {}
  };

  var location = {
    url: function() {}
  };

  var signupController, scope;

  describe('submitting', function() {

  beforeEach(function() {
    module('strengthTracker.signup');
    module(function($provide) {
      $provide.value('LoginService', loginService);
      $provide.value('$location', location);
    });
  });

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    signupController = function() {
      return $controller('SignupController', {'$scope': scope, '$rootScope':$rootScope, 'LoginService':loginService});
    };
    scope.vm = signupController;
  }));

  beforeEach(function() {
    scope.username="Todd Jordan";
    scope.userid="todd.jordan";
    scope.password="myPassword";
  });

    
    it('should submit the user profile data', function() {
      spyOn(loginService, 'signup');
      signupController();
      scope.signupClicked();
      expect(loginService.signup).toHaveBeenCalledWith('todd.jordan', 'Todd Jordan', 'myPassword', jasmine.any(Function), jasmine.any(Function));
    });

    
  });

  describe('successful signup', function() {
    
    it('should redirect to the base url', function() {
      spyOn(location, 'url');
      spyOn(loginService, 'signup');
      signupController();
      scope.signupClicked();
      loginService.signup.argsForCall[0][3]({userid:"todd.jordan", username:"Todd Jordan"});
      expect(location.url).toHaveBeenCalled();
    });
  });

  describe('failed signup', function() {
  
    it('should stay on the same page', function() {
    });

    it('should set error state in scope', function() {

    });
  });
});
