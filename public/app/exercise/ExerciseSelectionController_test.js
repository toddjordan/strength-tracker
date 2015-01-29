'use strict';

describe('strengthTracker exercise selection  module', function() {

  var workoutService = {
    fetchData:function(success,selectionModel){},
    createExercise:function(exercise){}
  };

  var chartService = {
    applyNewExercise:function(exercise){}
  };

  var selectionService = {
  };

  var modalInstance = {
  };

  var modal = {
    open:function(props){}
  };

  var exerciseSelectionController, scope;

  beforeEach(function() {
    module('strengthTracker.exerciseSelection');
    module(function($provide) {
      $provide.value('WorkoutService', workoutService);
      $provide.value('ChartService', chartService);
      $provide.value('$modal', modal);
    });
  });

  beforeEach(inject(function($rootScope, $controller, $modal) {
    scope = $rootScope.$new();
    exerciseSelectionController = function() {
      return $controller('ExerciseSelectionController', {'$scope':scope, '$modal':modal, 'WorkoutService':workoutService, 'ChartService':chartService, 'SelectionService':selectionService});
    };
    scope.vm = exerciseSelectionController;
  }));

  describe('ExerciseSelectionController', function() {

    it('should fetch exercise data', function(){
      spyOn(workoutService, 'fetchData');
      exerciseSelectionController();
      expect(workoutService.fetchData).toHaveBeenCalled();
    });

    it('should watch for item selection', function() {
      spyOn(scope, '$watch');
      exerciseSelectionController();
      expect(scope.$watch).toHaveBeenCalled();
    });

  });

  describe('Successful Fetching of Data', function() {
    var exercises = ["workout1", "workout2"];
    var selectedExercise = "workout2";
    selectionService.selectedExercise = selectedExercise;

    beforeEach(function() {
      scope.launchAddModal = function(){};
      workoutService.exercises = exercises;
      spyOn(workoutService, 'fetchData');
      exerciseSelectionController();
      workoutService.fetchData.argsForCall[0][0]();
    });

    it('should set list of exercises', function() {
      //capture fetch data call and run it
      expect(scope.items).toBe(exercises);
    });
    it('should set selected exercise', function() {
      expect(scope.selectedItem).toBe(selectedExercise);
    });
  });

  describe('Launching Create Exercise Modal', function() {
    it ('should open modal', function() {

    });

  });

  describe('Create Exercise Modal Submit', function(){
    it ('should save the exercise', function() {
      spyOn(workoutService, 'createExercise');
      exerciseSelectionController();
      scope.launchAddModal();
    });
  });


  
  describe('A selection change', function() {
    
    it ('should set the selected exercise', function() {

    });

    it('should clear the selected workout', function() {
    
    });

    it('should update the chart for the new exercise', function() {

    });
  });


  

});
