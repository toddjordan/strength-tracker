'use strict';

describe('In the exercise selection module,', function() {

  var workoutService = {
    fetchData:function(success,selectionModel){},
    createExercise:function(exercise){}
  };

  var chartService = {
    applyNewExercise:function(exercise){}
  };

  var selectionService = {
    clearSelectedWorkout:function(){}
  };

  var modalInstance = {
    result:{
      then:function(doFun) {
      }
    }
           
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

  describe('controller execution', function() {

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

  describe('upon successfully fetching data', function() {
    var exercises = ["workout1", "workout2"];
    var selectedExercise = "workout2";
    selectionService.selectedExercise = selectedExercise;

    beforeEach(function() {
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

  describe('clicking to add an exercese', function() {
    it ('should open modal', function() {
      spyOn(modal, 'open').andReturn(modalInstance);
      exerciseSelectionController();
      scope.launchAddModal();
      expect(modal.open).toHaveBeenCalled();
    });

  });

  describe('submitting the new exercise dialog', function(){
    it ('should request creation of the new exercise', function() {
      spyOn(workoutService, 'createExercise');
      spyOn(modal, 'open').andReturn(modalInstance);
      exerciseSelectionController();
      scope.launchAddModal();
    });
  });


  
  describe('changing the exercise selection', function() {
    var exercise = {
      date:"1/30/2015"
    };
    beforeEach(function() {
      spyOn(selectionService, 'clearSelectedWorkout');
      spyOn(chartService, 'applyNewExercise');
      exerciseSelectionController();
      scope.selectedItem = exercise;
      scope.$digest();
    });
    it ('should set the selected exercise on the model', function() {
      expect(selectionService.selectedExercise).toBe(exercise);
    });

    it('should clear the selected workout', function() {
      expect(selectionService.clearSelectedWorkout).toHaveBeenCalled();
    });

    it('should update the chart for the new exercise', function() {
      expect(chartService.applyNewExercise).toHaveBeenCalled();
    });
  });


  

});
