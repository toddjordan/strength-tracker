module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/app/bower_components/angular/angular.js',
      'public/app/bower_components/angular-route/angular-route.js',
      'public/app/bower_components/angular-mocks/angular-mocks.js',
      'public/app/components/**/*.js',
      'public/app/workout/**/*.js',
      'public/app/services/**/*.js',
      'public/app/exercise/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
