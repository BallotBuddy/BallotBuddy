//
// cggrabber.js
//
// candidate grabber queries the candidate API
// and regenerates the candidate database.
//
//var cfg = require('../config');
var db = require('../database/db');
var _ = require('underscore');
var cand = require('./dbhelper');
var PromiseThrottle = require('promise-throttle');

//
// PromisedThrottle will ensure we don't exceed 2 queries per second
//
var pthrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise
});


//var candidateUrl = 'http://www.opensecrets.org/api?method=getLegislators&id=NJ&apikey=__apikey__';

//
// Main worker function collects candidates
// then stores them in the database
//
var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
  "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

var collectCandidates = function (states) {
  return Promise.all(_.map(states, function (state) {
    console.log(state);
    return pthrottle.add(collectCandidate.bind(this, state))
      .then(function () {
        console.log("Candidate queried");
      })
  }))
    .then(function () {
      console.log("All candidates queried");
    })
}

var worker = function () {
  db.deleteEverything();
  db.ensureSchema()
    .then(function () {

      console.log("Regenerated candidate tables");
      return collectCandidates(states);
    })
    .catch(function (err) {
      console.log("Worker failed: ", err);
    })
} ();





//
// Fetches a scrubbed array of candidates and
// inserts them into the candidates table
//
var collectCandidate = function (state) {
  //
  // Query info for Candidate Search API
  //
  var candidates = {
    uri: 'http://www.opensecrets.org/api/?method=getLegislators&id=' + state + '&output=json',
    qs: {
      apikey: '31779c7d2d96d53b00c738b77b0d32a1'

    },
    headers: {
      'User-Agent': 'request-promise'
    },
    json: true
  };

  return cand.fetch(candidates)
    .then(function (cgs) {
      console.log("Cleaned results: ", cgs);
      //
      // Insert candidate data into db
      //
      return db.insertEverything(cgs, 'candidate');
    })
}


