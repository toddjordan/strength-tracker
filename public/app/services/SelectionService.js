function SelectionService() {
  var nullWorkout = {
    date:"Select a Workout"
  };
  this.selectedWorkout = nullWorkout;

  this.selectedExercise = {};
  this.selectedExercise.workouts = [];
  this.clearSelectedWorkout = function() {
    this.selectedWorkout = nullWorkout;
  };
  this.clearAllWorkouts = function() {
    this.selectedExercise.workouts = [];
  };
  this.selectARandomExercise =  function(exercises) {
    var exercise;
    for (i in exercises) {
      exercise = exercises[i];
      break;
    }
    this.selectedExercise = exercise;
      return exercise;
  };
}
