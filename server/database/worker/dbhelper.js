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
  candTemplate.candidate_firstlast = candidate["firstlast"].toUpperCase();
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
  candTemplate.state = candidate["state"];
  candTemplate.picture = candidate['picture'];

  return candTemplate;
}


//
// Fetch, parse, and filter candidate info
//



Cand.fetch = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate info");
      return (res);
    })
    .catch(function (err) {
     console.log("Failed to fetch candidate info: ", err);
    })
    .then(function (jsres) {
     console.log("Successfully parsed candidate info:");
      return jsres.response.legislator.map(function (item) {
        
        var candidateObj = item['@attributes'];
        // fixed url so that it will have a proper url for candidate photos.
        candidateObj.picture = 'https://s3.amazonaws.com/assets.opensecrets.org/politicians/img/' + candidateObj.cid + ".jpg";
        //grabs first two characters from the candidate.office and uses them to populate the state field
        candidateObj.state = candidateObj.office[0]+candidateObj.office[1];
        return buildCandObject(candidateObj);
      });
    });
}
