'use strict';

describe('Strength Tracker Workout Module', function() {

  var workout1 = {
    date:"1/1/2111",
    sets:2,
    oneRM:200
  };

  var workout2 = {
    date:"2/2/2222",
    sets:2,
    oneRM: 300
  };

  var workoutService = {
    clearSelectedWorkout:function(){}
  };

  var oneRepMaxService = {
    calculate: function(weight, reps) {
      return 200;
    }
  };

  var chartService = {
    getOneRMChartData: function() {
      return {
        series: [1,2,3,4],
        labels: ["a","b","c","d"]
      };
    }
  };
  
  var workoutController, scope;

  beforeEach(function() {

    module("strengthTracker.workout");
    module(function($provide){
      $provide.value("WorkoutService", workoutService);
      $provide.value("OneRepMaxService", oneRepMaxService);
      $provide.value("ChartService", chartService);
    } );  
  });


  beforeEach(inject(function($rootScope, $controller) {

    scope = $rootScope.$new();
    workoutController = function() {
      return $controller('WorkoutController', {'$scope':scope, 'WorkoutService':workoutService, 'OneRepMaxService':oneRepMaxService, 'ChartService': chartService});
    };
  }));

  describe('WorkoutController', function(){
    var controller;
    beforeEach(function() {
      controller = workoutController();
    });

    it('should be instantiable', inject(function($controller) {
      expect(controller).toBeDefined();
    }));

    it('should hide add set button by default', inject(function($controller) {
      expect(scope.addSetHidden).toBe(true);
    }));
  });

  describe('Toggling a workout', function() {


    it('should show the add set button for a new selection', function() {
      
      workoutController();
      scope.model.selectedWorkout = workout1;
      scope.handleEditToggle(workout2);
      expect(scope.addSetHidden).toBe(false);
    });

    it('should clear selected workout for the same selection', inject(function() {
      spyOn(workoutService, 'clearSelectedWorkout');
      workoutController();
      scope.model.selectedWorkout = workout1;
      scope.handleEditToggle(workout1);
      expect(workoutService.clearSelectedWorkout).toHaveBeenCalled();

    }));

    it('should hide add set button for the same selection', inject(function() {
      workoutController();
      scope.model.selectedWorkout = workout1;
      scope.handleEditToggle(workout1);
      expect(scope.addSetHidden).toBe(true);
     }));

  });
  
  describe('Removing a workout', function() {
    var workouts;
    beforeEach(function(){
      workouts = [workout1, workout2];      
    });

    it('should remove workout at given index', inject(function() {
      workoutController();
      scope.removeWorkout(workouts, 0);
      expect(workouts.length).toBe(1);
      expect(workouts[0].date).toBe("2/2/2222");

    }));


  });

  describe('Adding a workout', function() {
    var workouts;
    beforeEach(function(){
      workouts = [workout1, workout2];      
    });

    it('should add  workout to first item in array', inject(function() {
      workoutController();
      scope.addNewWorkout(workouts);
      expect(workouts.length).toBe(3);
      expect(workouts[0].sets.length).toBe(0);
    }));

    it('should add todays date to the new workout', inject(function() {
       workoutController();
      scope.addNewWorkout(workouts);
      expect(workouts[0].date).not.toBe("1/11/2111");
      expect(workouts[0]).not.toBe("2/2/2222");
    }));

  });

  describe('Removing a set', function() {
    var sets;
    beforeEach(function(){
      sets=[{weight:400, reps:4},{weight:200,reps:8}];
    });

    it('should remove set at the given index', inject(function() {
      workoutController();
      scope.removeSet(sets, 0);
      expect(sets.length).toBe(1);
      expect(sets[0].weight).toBe(200);
    }));
  });

  describe('Adding a set', function() {
    var sets;
    beforeEach(function(){
      sets=[{weight:400, reps:4},{weight:200,reps:8}];
    });

    it('should add an empty set to the end', inject(function(){
      workoutController();
      scope.addNewSet(sets);
      expect(sets.length).toBe(3);
      expect(sets[2]).toEqual({});
    }));
  });

  describe('Updating 1RM when set changes', function() {
    
    it('should set 1RM to set if its greater than current', inject(function() {
      workoutController();
      var set = {weight:200, reps:1};
      var exercise = {oneRM:100};
      scope.onSetChange(set, exercise);
      expect(exercise.oneRM).toBe(200);
    }));

    it('should not set 1RM to set if its less than current', inject(function() {
      workoutController();
      var set = {weight:200, reps:1};
      var exercise = {oneRM:300};
      scope.onSetChange(set, exercise);
      expect(exercise.oneRM).toBe(300);
    }));
    
    it('should update chart data', inject(function() {
      workoutController();
      var set = {weight:200, reps:1};
      var exercise = {oneRM:300};
      chartService.getOneRMChartData = jasmine.createSpy("getOneRMChartData spy");
      scope.onSetChange(set, exercise);
      expect(chartService.getOneRMChartData).toHaveBeenCalled();
    }));
  });
  
});
