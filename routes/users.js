'use strict';

var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/strength-tracker');

module.exports = function(passport) {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/', function(req,res,next) {
    console.log("received post: %j", req.body);
    var user = req.body;
    //create in database
    db.collection('users').insert(user, function(err, result) {
      if (err) {
        console.log("error inserting user: %s", err);
        throw err;
      }
    });      
    req.logIn({username:user.userid, password:user.password}, function(err) {
      if (err) {
        console.log("error logging in after signup: %s", err);
        throw err;
      }
      console.log("successful login after signup: %j", user);
      return res.status(201).json(user);
    });
  });

  return router;
};
