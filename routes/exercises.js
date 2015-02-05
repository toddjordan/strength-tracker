var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/strength-tracker');
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('exercises').find().toArray(function(err, result) {
    if (err) throw err;
    var exerciseResults = {};
    for (var i=0;i<result.length;i++) {
      exerciseResults[result[i].name] = result[i];
    }
    res.status(200).json({exercises:exerciseResults});
  });

});

router.post('/', function(req, res, next) {
  var exercise = req.body.exercise;
  var exerciseName = exercise.name;
  db.collection('exercises').insert(exercise, function(err, result) {
    if (err) throw err;
  });
  db.collection('exercises').findOne({name:exerciseName}, function(err, result) {
    res.status(201).json(result);
  });

});

router['delete']('/:exerciseId', function(req, res, next) {
  var id = req.id;
  db.collection('exercises').remove({_id:ObjectID.createFromHexString(id)}, function(err, result) {
    if (!err) {
      res.status(204).json(result);
    } else {
      throw err;
    }
  });
});

router.put('/:exerciseId', function(req, res, next) {
  var id = req.id;
  var exercise = req.body.exercise;
  var name = exercise.name;
  delete exercise._id;
  db.collection('exercises').findAndModify({_id:ObjectID.createFromHexString(id)}, {}, {$set:exercise}, function(err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      throw err;
    }
  });
  
});

router.param('exerciseId', function(req, res, next, id) {
  req.id = id;
  next();
});

module.exports = router;
