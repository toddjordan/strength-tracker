var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/strength-tracker');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('exercises').find().toArray(function(err, result) {
    if (err) throw err;
    req.exercises = result;
  });
  var responseObject = {};
  responseObject.exercises = req.exercises;
  res.status(200).json(responseObject);
});

router.post('/', function(req, res, next) {
  
});

router.put('/:exerciseId', function(req, res, next) {

});

router.param('exerciseId', function(req, res, next, id) {

});

module.exports = router;
