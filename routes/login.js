var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();

var user = {
  name:"Todd Jordan",
  id: "todd.jordan"
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    //hardcoding user for now
    done(user);
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //hardcoding user for new.  Otherwise this would be a lookup.
  done(err, user);
});


router.post('/', passport.authenticate('local'),
           function(req,res) {
             res.status(200).json(req.user);
           }
);

module.exports = router;


