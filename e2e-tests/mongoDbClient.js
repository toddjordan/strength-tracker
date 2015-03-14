'use strict';
var MongoClient = require('mongodb').MongoClient;

var dbClient = function MongoDbClient() {
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/strength-tracker';

  return {
    insert: function(type, data, callback) {
      MongoClient.connect(url, function(err, db) {
        db.collection(type).insert([data], function(err, result) {
          if(err) {throw err;}
          callback(result);
        });
      });
    },

    remove: function(type, query, callback) {
      MongoClient.connect(url, function(err, db) {
        db.collection(type).remove(query, function(err, result) {
          if (err) {throw err;}
          callback(result);
        });
      });
    }
  };

};


module.exports = dbClient;

