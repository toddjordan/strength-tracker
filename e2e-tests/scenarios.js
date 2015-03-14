'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
var testUser = require('./testUser');
var testExercise = require('./testExercise');
var dbClient = require('./mongoDbClient')();
var userState = require('./userState')(testUser,dbClient);
var exerciseState = require('./exerciseState')(testExercise, dbClient);



describe('Strength Tracker', function() {

  beforeAll(function() {
    userState.setup();  
    exerciseState.setup();
    browser.get('index.html');
  });

  afterAll(function() {
    userState.teardown();
  });



  it('should automatically redirect to #/login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });

  describe('login', function() {
    it('should redirect to workout screen on a successful login', function() {
      element(by.model('username')).sendKeys(testUser.userid);
      element(by.model('password')).sendKeys(testUser.password);
      element(by.buttonText('Login')).click();
      expect(browser.getLocationAbsUrl()).toMatch('/workout');
    });
  });


  describe('exercise page', function() {

    it('should list existing workouts', function() {
      expect(element.all(by.css('#workoutTable tbody tr')).count()).toBe(1);
    });
  });


  describe('selecting a workout', function() {


    it('should display existing sets', function() {
      element.all(by.css('#workoutTable tbody tr')).first().click();
      expect(element.all(by.css('#setList li')).count()).toBe(2);
    });

  });

  describe('adding a workout', function() {
    
    beforeEach(function() {
      //click add workout button
    });

    it('should add a new workout to the top of the list', function() {

    });

    it('should display the current date', function() {

    });
  });

  describe('adding a set', function() {
    
    beforeEach(function() {
      
    });

    it('should update the one rep max', function() {
      
    });

    it('should persist weight and reps', function() {

    });
  });


});
