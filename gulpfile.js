'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  
});

gulp.task('lint', function() {
  return gulp.src(['app.js',
                   'public/app/*.js', 
                   'public/app/exercise/*.js',
                   'public/app/workout/*.js',
                   'public/app/login/*.js',
                   'public/app/services/*.js',
                   'public/app/signup/*.js',
                   'public/app/user/*.js']).
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish'), {verbose:true});
//    pipe(jshint.reporter('fail'));
});
