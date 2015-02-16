

var passport = require('passport');
var express = require('express');
var router = express.Router();

router.post('/', passport.authenticate('local'),
           function(req,res) {
             console.log("authenticating local");
             res.status(200).json(req.user);
           }
);

module.exports = router;


