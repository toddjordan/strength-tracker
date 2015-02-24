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
var users = require('./routes/users');


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

var user = {
  name:"Todd Jordan",
  id: "todd.jordan"
};
app.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, loginuser, info) {
      console.log('local login');
      req.logIn(user, function(err) {
              return res.json(user);
      });

    })(req, res, next);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    //hardcoding user for now
    console.log("local strategy");
    done(null, user);
  }
));

var exercises = require('./routes/exercises')(passport);
app.use('/exercises', exercises);

passport.serializeUser(function(loggedInUser, done) {
  console.log("serializing user");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //hardcoding user for new.  Otherwise this would be a lookup.
  console.log("deserializing user");
  done(null, user);
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
