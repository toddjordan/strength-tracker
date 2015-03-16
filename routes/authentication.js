'use strict';

var express = require('express');
var router = express.Router();
var db= require('mongoskin').db('mongodb://localhost:27017/strength-tracker');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  
  router.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        console.log('local login for: %j with %j', user, info);
        if (user) {
          req.logIn(user, function(err) {
            if (err) {
              console.log("error logging in: %s", err);
              throw err;
            }
            console.log("successful logn: %j", user);
            return res.json(user);
          });

        } else {
          res.sendStatus(401);
        }
        
      })(req, res, next);
  });

  router.post('/logout', function(req, res, next) {
    console.log('logging out');
    req.logout();
    return res.sendStatus(204);
  });

  passport.use(new LocalStrategy(
    function(userid, password, done) {
      console.log("local strategy");
      console.log('userid: %s, password: %s', userid, password);
      db.collection('users').findOne({userid:userid, password:password}, function(err, result) {
        if(err) {
          console.log("error finding user: %s", err);
          throw err;
        }
        console.log("found user: %j", result);
        if (result) {
          console.log("calling done for %j", result);
          done(null, result);
        } else {
          console.log('authentication failed, returning false');
          done(null, false);
        }
      });
    }
  ));

  
  passport.serializeUser(function(loggedInUser, done) {
    console.log("serializing user: %j", loggedInUser);
    done(null, loggedInUser.userid);  
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserializing user: %s", id);
    db.collection('users').findOne({userid:id}, function(err, result) {
      console.log("found user: %j", result);  
      done(null, result);
    });
  });


  return router;

};

