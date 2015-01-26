
function ChartService() {

  this.applyNewExercise = function(exercise) {
    this.exercise = exercise;
  };

  this.getOneRMChartData = function() {
    var dates = [];
    var oneRMs = [];
    if (typeof this.exercise != 'undefined'){
      for (var i=this.exercise.workouts.length-1;i>=0;i--) {
        dates.push(this.exercise.workouts[i].date);
        oneRMs.push(this.exercise.workouts[i].oneRM);
      }
    } else {
      dates.push("date");
      oneRMs.push(0);
    }
    var data = {};
    data.labels = dates;
    data.series = [oneRMs];
    return data;
  };


}
