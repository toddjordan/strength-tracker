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
      'public/app/exercise/**/*.js',
      'public/app/login/**/*.js',
      'public/app/signup/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-html-reporter',
      'karma-coverage'
            ],

    reporters: ['progress', 'html', 'coverage'],

    preprocessors: {
      'public/app/components/**/*.js': ['coverage'],
      'public/app/workout/**/*.js': ['coverage'],
      'public/app/services/**/*.js': ['coverage'],
      'public/app/exercise/**/*.js': ['coverage'],
      'public/app/login/**/*.js': ['coverage'],
      'public/app/signup/**/*.js': ['coverage']

    },

    coverageReporter: {
      type:'text-summary',
      dir: 'coverage/'
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    htmlReporter: {
      outputDir:'karma_html',
      templatePath: __dirname+'/node_modules/karma-html-reporter/jasmine_template.html'
    }

  });
};
