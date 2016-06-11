//
// db.js
//
// KNEX database library
// plus additional database helper functions
//
var path = require('path');

var config = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = require('knex')(config[env])
var _ = require('underscore');

module.exports = knex;

knex.ensureSchema = ensureSchema = function () {
  return Promise.all([
    knex.schema.hasTable('candidate').then(function (exists) {
      if (!exists) {
        knex.schema.createTable('candidate', function (table) {
          table.string('candidate_id', 30).primary();
          table.string('candidate_firstName', 25);
          table.string('candidate_lastName', 25);
          table.string('candidate_birthDate', 40);
          table.string('candidate_gender', 1);
          table.string('candidate_photo', 255);
          table.string('candidate_phone', 20);
          table.string('candidate_office',40);
          table.string('candidate_youtube',200);
          table.string('candidate_website',255);
          table.string('candidate_facebook',255);
          table.string('candidate_office',50);
        }).then(function (table) {
          console.log('Created candidate table.');
        })
      }
    })


  ])
}

knex.deleteEverything = function () {
  return knex('candidate').truncate()
   .then(function () {
      console.log("Deleted candidate db tables")
    })
}

//
// Select all candidates from candidates table
//
knex.queryCandidate = function() {
  return knex('candidate').select();
};

//
// Insert all elements of a campground/campsite array into the given table name
//
knex.insertEverything = function(candArr, table) {
  return Promise.all(_.map(candArr, function(candidate) {
    return knex(table).insert(candidate)
      .then(function (res) {
        console.log("Added entry to " + table + " table: ", res);
      })
      .catch(function (err) {
        console.log("Error inserting into " + table + " table: ", err);
      })
  })).then(function() {
    return campArr;
  });
}

knex.closeDb = function () {
  knex.destroy().then(function () {
    console.log("Closed db connection")
  })
}
