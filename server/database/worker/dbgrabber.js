//
// cggrabber.js
//
// candidate grabber queries the candidate API
// and regenerates the candidate database.
//
var db = require('../database/db');
var _ = require('underscore');
var cand = require('./dbhelper');
var PromiseThrottle = require('promise-throttle');

// Fetches a scrubbed array of candidates and
// inserts them into the candidates table
//
var collectCandidate = function (state) {
    "use strict";
  //
  // Query info for Candidate Search API.
  //
    var candidate = {
            uri: 'http://www.opensecrets.org/api/?method=getLegislators&id=' + state + '&output=json',
            qs: {
                apikey: process.env.Candidate_key
            },
            headers: {
                'User-Agent': 'request-promise'
            },
            json: true
        };
    return cand.fetch(candidate)
            .then(function (cgs) {
        //
        // Insert candidate data into db
        //
            return db.insertEverything(cgs, 'candidate');
        });
};

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
    "use strict";
    return Promise.all(_.map(states, function (state) {

        return pthrottle.add(collectCandidate.bind(this, state))
                .then(function () {
                console.log("Candidate queried");
            });
    }))
            .then(function () {
            console.log("All candidates queried");
        });
};

var worker = function () {
    "use strict";
    db.ensureSchema().then(db.closeDb);
}();

