function WorkoutService(http) {

  this.http = http;
  this.exercises = {};
  var serviceObj = this;

  this.fetchData = function(success, selectionModel) {
    http.get('/exercises').success(function(data, status, headers, config) {
      serviceObj.exercises = data;
      selectionModel.selectedExercise = selectionModel.selectARandomExercise(serviceObj.exercises);
      success();
    }).error(function(data, status, headers, config) {

    });

  };

}
