var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/strength-tracker');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('exercises').find().toArray(function(err, result) {
    if (err) throw err;
    var exercises = result;
    exercises =  {
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
    res.status(200).json(exercises);
  });

});

router.post('/', function(req, res, next) {
  
});

router.put('/:exerciseId', function(req, res, next) {

});

router.param('exerciseId', function(req, res, next, id) {

});

module.exports = router;
