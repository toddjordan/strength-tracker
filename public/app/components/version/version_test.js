'use strict';

describe('In the version module,', function() {
  beforeEach(module('strengthTracker.version'));

  describe('the version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
