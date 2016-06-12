//
// db.js
//
// KNEX database library
// plus additional database helper functions
//
var path = require('path');

var config = require('../database/knex')
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
          table.string('candidate_firstlast', 25);
          table.string('candidate_lastName', 25);
          table.string('party', 15);
          table.string('office', 25);
          table.string('gender', 1);
          table.string('first_elected', 25);
          table.string('exit_code', 15);
          table.string('comments', 255);
          table.string('phone', 20);
          table.string('fax', 20);
          table.string('website', 255);
          table.string('webform', 255);
          table.string('congress_office', 20);
          table.string('bioguide_id', 20);
          table.string('votesmart_id', 50);
          table.string('feccandid', 50);
          table.string('twitter_id', 45);
          table.string('youtube_url', 20);
          table.string('facebook_id', 50);
          table.string('birthdate', 50);
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
knex.queryCandidate = function () {
  return knex('candidate').select();
};

//
// Insert all elements of a candidate array into the given table name
//
knex.insertEverything = function (candArr, table) {
  return Promise.all(_.map(candArr, function (candidate) {
    return knex(table).insert(candidate)
      .then(function (res) {
        console.log("Added entry to " + table + " table: ", res);
      })
      .catch(function (err) {
        console.log("Error inserting into " + table + " table: ", err);
      })
  })).then(function () {
    return candArr;
  });
}

knex.closeDb = function () {
  knex.destroy().then(function () {
    console.log("Closed db connection")
  })
}
