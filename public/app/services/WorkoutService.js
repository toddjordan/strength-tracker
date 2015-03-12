'use strict';
function WorkoutService(http) {

  this.http = http;
  this.exercises = {};
  var serviceObj = this;

  this.fetchData = function(success, selectionModel) {
    http.get('/exercises').success(function(data, status, headers, config) {
      serviceObj.exercises = data.exercises;
      selectionModel.selectedExercise = selectionModel.selectARandomExercise(serviceObj.exercises);
      success();
    }).error(function(data, status, headers, config) {

    });
  };

  this.createNewExercise = function(exerciseName, selectionModel, success) {
    var newExercise = {};
    newExercise.name = exerciseName;
    newExercise.workouts = [];
    http.post('/exercises', {exercise:newExercise}).success(function(data, status, headers, config) {
      serviceObj.exercises[exerciseName] = data;
      selectionModel.selectedExercise = data;
      selectionModel.clearSelectedWorkout();
      success();
    }).error(function(data, status, headers, config) {
      
    });
  };

  this.removeExercise = function(selectionModel, success) {
    var exercise = selectionModel.selectedExercise;
    var exerciseName = exercise.name;
    var id = exercise._id;
    http['delete']('/exercises/'+id).success(function(data, status, headers, config) {
      selectionModel.clearSelectedWorkout();
      delete serviceObj.exercises[exerciseName];
      selectionModel.selectARandomExercise(serviceObj.exercises);
      success();
    });
  };

  this.updateExercise = function(selectionModel) {
    var exercise = selectionModel.selectedExercise;
    var id = exercise._id;
    if (typeof id !== 'undefined') {
      http.put('/exercises/'+id, {exercise:exercise}).success(function(data,status,headers,config) {
      
      });
    }
  };
}
