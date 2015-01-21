'use strict';

describe('strengthTracker.version module', function() {
  beforeEach(module('strengthTracker.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
