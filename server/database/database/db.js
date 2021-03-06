//
// db.js
//
// KNEX database library
// plus additional database helper functions
//
var path = require('path');
var configuration = require('../../../config.js');
var config = configuration.configuration();
var env = config.database;
console.log('database environment', env);
var knex = require('knex')(env);
  

module.exports = knex;

knex.deleteEverything = function () {
    "use strict";
  //return knex('candidate').truncate()
    return knex.schema.dropTableIfExists('funding')
         .then(function () {
            knex.schema.dropTableIfExists('candidate')
                .then(function () {
                    console.log("Deleted candidate db tables");
                });
        });
};

knex.ensureSchema = function () {
  return Promise.all([
        knex.schema.hasTable('candidate').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('candidate', function (table) {
                    table.string('candidate_id', 30).primary();
                    table.string('candidate_firstlast', 25);
                    table.string('candidate_lastname', 25);
                    table.string('party', 15);
                    table.string('office', 25);
                    table.string('gender', 1);
                    table.string('first_elected', 25);
                    table.string('exit_code', 15);
                    table.string('comments', 255);
                    table.string('phone', 255);
                    table.string('fax', 255);
                    table.string('website', 255);
                    table.string('webform', 255);
                    table.string('congress_office', 255);
                    table.string('bioguide_id', 255);
                    table.string('votesmart_id', 50);
                    table.string('feccandid', 50);
                    table.string('twitter_id', 45);
                    table.string('youtube_url', 255);
                    table.string('facebook_id', 50);
                    table.string('birthdate', 50);
                    table.string('state', 5);
                    table.string('picture', 255);
                }).then(function () {
                    console.log('Created candidate table.');
                });
            }
        }),
        knex.schema.hasTable('funding').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('funding', function (table) {
                    table.increments('row_id').primary();
                    table.string('candidate_id', 30);
                    table.string('sector_code', 5);
                    table.string('industry', 50);
                    table.string('sector', 50);
                    table.decimal('funding');
                }).then(function () {
                    console.log('Created funding table.');
                });
            }
        })
    ]);
};
// selects all candidates by state.
knex.getCandByState = function (canstate) {
  return knex('candidate').where({ state: canstate }).select();
};

//
// Select all candidates from candidates table
//
knex.queryCandidate = function () {
  return knex('candidate').select();
};

//selects a candidate by id
knex.queryByCandId = function (id) {
  return knex('candidate').where({ candidate_id: id }).select();
};

// selects candidate by votesmart_id
knex.queryByVoteSmartId = function (id) {
  return knex('candidate').where({ votesmart_id: id }).select();
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
            });
    })).then(function () {
        return candArr;
    });
};
// Get all funding where candidate id matches
knex.queryFunding = function (id) {
    return knex('funding').where({ candidate_id: id }).select();
};

knex.insertFundingRow = function(row){
  return knex('funding').insert(row);
};

//close database connection
knex.closeDb = function () {
  knex.destroy().then(function () {
        console.log("Closed db connection");
    });
};
