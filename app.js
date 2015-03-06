var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var routes = require('./routes/index');
var db = require('mongoskin').db('mongodb://localhost:27017/strength-tracker');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret:"keyboard cat",
  resave:false,
  saveUninitialized:false,
  cookie: {
    maxAge: 60000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log('local login for: %j', user);
      req.logIn(user, function(err) {
        if (err) {
          console.log("error logging in: %s", err);
          throw err;
        }
        console.log("successful logn: %j", user);
        return res.json(user);
      });
    })(req, res, next);
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
      console.log("calling done for %j", result);
      done(null, result);
    });
  }
));

var exercises = require('./routes/exercises')(passport);
var users = require('./routes/users')(passport);
app.use('/exercises', exercises);
app.use('/users',users);

passport.serializeUser(function(loggedInUser, done) {
  console.log("serializing user: %j", loggedInUser);
  done(null, loggedInUser.userid);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializing user: %s", id);
  db.collection('users').findOne({userid:id}, function(err, result) {
    if(err) {
      console.log("error finding user: %s", err);
      throw err;
    }
    console.log("found user: %j", result);  
    done(null, result);
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
