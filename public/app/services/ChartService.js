'use strict';

function ChartService() {

  this.data = {};

  this.applyNewExercise = function(exercise) {
    this.exercise = exercise;
    this.updateOneRMChartData();
  };

  this.getOneRMChartData = function() {
    this.updateOneRMChartData();
    return this.data;
  };

  this.updateOneRMChartData = function() {
    var dates = [];
    var oneRMs = [];
    if (typeof this.exercise !== 'undefined'){
      for (var i=this.exercise.workouts.length-1;i>=0;i--) {
        dates.push(this.exercise.workouts[i].date);
        oneRMs.push(this.exercise.workouts[i].oneRM);
      }
    } else {
      dates.push("date");
      oneRMs.push(0);
    }
    this.data.labels = dates;
    this.data.series = [oneRMs];
  };


}
