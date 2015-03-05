var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/', function(req,res,next) {
    console.log("received post: %j", req.body);
    var user = req.body;
    //create in database

    return res.status(201).json(user);

  });

  return router;
};
