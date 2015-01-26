function WorkoutService(http) {
  var nullWorkout = {
    date:"Select a Workout"
  };
  this.http = http;
  this.selectedWorkout = nullWorkout;
  this.exercises = {};
  this.selectedExercise = {};
  this.selectedExercise.workouts = [];
  this.clearSelectedWorkout = function() {
    this.selectedWorkout = nullWorkout;
  };

  this.fetchData = function(success) {
    var serviceObj = this;
    var selectARandomExercise = function(exercises) {
      var exercise;
      for (i in exercises) {
        exercise = exercises[i];
        break;
      }
      return exercise;
    };
    http.get('/exercises').success(function(data, status, headers, config) {
      serviceObj.exercises = data;
      serviceObj.selectedExercise = selectARandomExercise(serviceObj.exercises);
      success();
    }).error(function(data, status, headers, config) {

    });

  };
  

}
