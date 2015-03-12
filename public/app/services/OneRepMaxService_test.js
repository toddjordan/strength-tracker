'use strict';
/* global OneRepMaxService */

describe('In the one rep max service,', function() {
  var oneRepMaxService;

  beforeEach(function() {
    oneRepMaxService = new OneRepMaxService();
  });

  describe('calculating one rep max according to the Epley formula', function() {

    it('should return same weight for one rep', function() {
      var oneRM = oneRepMaxService.calculate(200, 1);
      expect(oneRM).toBe(200);
    });

    it('should return double the weight for 30 reps', function() {
      var oneRM = oneRepMaxService.calculate(200, 30);
      expect(oneRM).toBe(400);
    });

    it('should round to the nearest hundredth', function() {
      var oneRM = oneRepMaxService.calculate(200, 20);
      expect(oneRM).toBe(333.33);
    });

    it('should return 0 if reps are 0', function() {
      var oneRM = oneRepMaxService.calculate(200, 0);
      expect(oneRM).toBe(0);
    });
  });

});
