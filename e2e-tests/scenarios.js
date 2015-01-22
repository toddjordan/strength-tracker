'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Strength Tracker', function() {

  browser.get('index.html');

  it('should automatically redirect to /workout when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/workout");
  });


  describe('workout', function() {

    beforeEach(function() {
      browser.get('index.html#/workout');
    });


    it('should render workout when user navigates to /workout', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
