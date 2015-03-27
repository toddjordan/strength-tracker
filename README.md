# strength-tracker

A web application, written in JavaScript using AngularJS, that tracks weight lifting and strength progress.  My headfirst jump into MEAN stack programming.  Essentially strength tracker will track your one rep max over time, so you can see whether working out is doing anything for you.  You simply log you workout reps and weights and it will give you a rough caclulation on the amount of weight that you can do one rep for.  A chart will tell you what that metric is doing over time.

![alt text](https://presentationtier.files.wordpress.com/2015/03/strengthtrackerfinal.png?w=700&h=413 "awesome sauce")

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Prerequisites

You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.


## Directory Layout

```
routes
    authentication.js            --> routes for handling login
    exercises.js                 --> routes for exercise-related CRUDopterations
    user.js                      --> routes for user registration and preferences
public/app/                      --> all of the source files for the application
  app.css                        --> default stylesheet
  components/                    --> all app specific modules
    version/                     --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  exercise/                      --> logic for listing selecting exercises
    ExerciseSelectionController.js
  login/
    LoginController.js           -->Handles login commands
    LoginController_test.js
    login.html
  user/
    UserOptionsController.js     -->Handles actions from the user profile menu (logout)
  signup/
    SignupController.js          -->Handles actions from the user registration page
    SignupController_test.js      
    signup.html
  workout/                        --> the main workout view template and logic
    workout.html                  
    WorkoutController.js           
    WorkoutController_test.js         
  services/                
    WorkoutService.js           
    WorkoutService_test.js        
    OneRepMaxService.js           --> Calculates 1RM
    OneRepMaxService_test.js
    SelectionService.js           --> Keeps workout selection state
    UserProfileService.js 
    ChartService.js               --> Configures a chart-friendly object from given workout data
  app.js                          --> main application module
  index.html                      --> app layout file (the main html template file of the app)
  index-async.html                --> just like index.html, but loads js files asynchronously
karma.conf.js                     --> config file for running unit tests with Karma
e2e-tests/                        --> end-to-end tests
  protractor-conf.js              --> Protractor config file
  scenarios.js                    --> end-to-end scenarios to be run by Protractor
```

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```

You can also run the unit tests in gulp as follows

```
gulp watch
```

### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
