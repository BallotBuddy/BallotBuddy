var rp = require('request-promise');
var _ = require('underscore');
var db = require('../database/db');

var Cand = module.exports;

//
// Promisify the xml2js XML parse function
//


//
// Build a candidate element with property names matching
// our database schema
//
var buildCandObject = function (candidate) {
  var candTemplate = {};
  candTemplate.candidate_id = candidate["cid"];
  candTemplate.candidate_firstlast = candidate["firstlast"];
  candTemplate.candidate_lastname = candidate["lastname"];
  candTemplate.party = candidate["party"]
  candTemplate.office = candidate["office"];
  candTemplate.gender = candidate["gender"];
  candTemplate.first_elected = candidate["first_elected"];
  candTemplate.exit_code = candidate["exit_code"];
  candTemplate.comments = candidate["comments"];
  candTemplate.phone = candidate["phone"];
  candTemplate.fax = candidate["fax"];
  candTemplate.website = candidate["website"];
  candTemplate.webform = candidate["webform"];
  candTemplate.congress_office = candidate["congress_office"];
  candTemplate.bioguide_id = candidate["bioguide_id"];
  candTemplate.votesmart_id = candidate["votesmart_id"];
  candTemplate.feccandid = candidate["feccandid"];
  candTemplate.twitter_id = candidate["twitter_id"];
  candTemplate.youtube_url = candidate["youtube_url"];
  candTemplate.facebook_id = candidate["facebook_id"];
  candTemplate.birthdate = candidate["birthdate"];

  return candTemplate;
}


//
// Fetch, parse, and filter candidate info
//
Cand.fetch = function (request, cId) {
  return rp(request)
    .then(function (res) {
      console.log(res);
      console.log("Successfully fetched candidate info");
      return (res);
    })
    .catch(function (err) {
      console.log(err);
      console.log("Failed to fetch candidate info: ");
      // console.log("Failed to fetch candidate info: ", err);
    })
    .then(function (jsres) {
      console.log("Successfully parsed candidate info:");
      return jsres.response.legislator.map(function (item) {
        console.log(item);
        return buildCandObject(item['@attributes']);
      });
    });
}


