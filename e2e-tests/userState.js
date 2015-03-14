'use strict';


var userState = function UserState(user, dbClient) {
  
  return {
    setup:function() {
      dbClient.insert('users', user, function(result) {
        console.log('inserted test user');
      });
    },
    teardown:function() {
      dbClient.remove('exercises', {userid:user.userid}, function(result) {
              dbClient.remove('users', {userid:user.userid}, function(result) {
                console.log('removed user %s, and all associated exercises', user.username);
              });
      });

    },

  };
};


module.exports = userState;



