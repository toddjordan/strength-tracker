'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var files = ['app.js',
                   'public/app/app.js', 
                   'public/app/exercise/*.js',
                   'public/app/workout/*.js',
                   'public/app/login/*.js',
                   'public/app/services/*.js',
                   'public/app/signup/*.js',
                   'public/app/user/*.js'];

gulp.task('default',['lint','test']);

gulp.task('lint', function() {
  return gulp.src(files).
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish'), {verbose:true});
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun:true
  }, done);
});

gulp.task('tdd', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('watch', function() {
  gulp.watch(files, ['lint', 'test']);
});
