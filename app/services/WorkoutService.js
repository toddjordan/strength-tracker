function WorkoutService() {
  var nullWorkout = {
    date:"Select a Workout"
  };

  this.selectedWorkout = nullWorkout;
  this.exercises = {};
  this.selectedExercise = {};

  this.clearSelectedWorkout = function() {
    this.selectedWorkout = nullWorkout;
  };

  this.fetchData = function() {
    this.exercises =  {
    "Bench Press": { 
        name: "Bench Press",
        workouts : [
          {
            exercise:"Bench Press",
            date:"1/2/2015",
            oneRM:0,
            sets:[
              {
	        weight:200,
	        reps:8
              },
              {
	        weight:200,
	        reps:8
              }
            ]
          }
        ]
      },
    "Military Press": { 
        name: "Military Press"
      }
    };
    this.selectedExercise = selectARandomExercise(this.exercises);
  };
  
  var selectARandomExercise = function(exercises) {
    var exercise;
    for (i in exercises) {
      exercise = exercises[i];
      break;
    }
    return exercise;
  };
}
