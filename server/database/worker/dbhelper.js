//var xmlToJs = require('xml2js').parseString;
var rp = require('request-promise');
var _ = require('underscore');
var db = require('../database/db');

var Cand = module.exports;

//
// Promisify the xml2js XML parse function
//
var promisedXmlToJs = function (xml) {
  return new Promise(function (resolve, reject) {
    xmlToJs(xml, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  })
};

//
// Build a candidate element with property names matching
// our database schema
//
var buildCandObject = function (candidate) {
  var candTemplate = {};
  candTemplate.candidate_id = candidate["cid"];
  candTemplate.firstlast = candidate["firstlast"];
  candTemplate.lastname = candidate["lastname"];
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
// Build a campsite element with property names matching
// our database schema
//
// var buildCsObject = function (cs, cg_id) {
//   var csTemplate = {};
//   csTemplate.campground_id_fk = cg_id;
//   csTemplate.trail_name = cs["Loop"];
//   csTemplate.max_eq_length = cs["Maxeqplen"];
//   csTemplate.max_people = cs["Maxpeople"];
//   csTemplate.site_id = cs["SiteId"]
//   csTemplate.site_name = cs["Site"]
//   csTemplate.site_type = cs["SiteType"];
//   csTemplate.waterfront = cs["sitesWithWaterfront"];
//   csTemplate.amps = cs["sitesWithAmps"] === 'Y' ? 1 : 0;
//   csTemplate.pets = cs["sitesWithPetsAllowed"] === 'Y' ? 1 : 0;
//   csTemplate.sewer = cs["sitesWithSewerHookup"] === 'Y' ? 1 : 0;
//   csTemplate.water = cs["sitesWithWaterHookup"] === 'Y' ? 1 : 0;
//   return csTemplate;
// }

//
// Fetch, parse, and filter candidate info
//
Cand.fetch = function(request, cId) {
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
            return jsres.response.legislator.map(function(item){
              console.log(item);
                     return buildCandObject(item['@attributes']);
     });
     });

//  var getKeys = function(obj){
//    var keys = [];
//    for(var key in obj){
//       keys.push(key);
//    }
//    return keys;

//    var answer = getKeys(jsres.response.legislator['@attributes']);
//    console.log(answer);

     // return _.chain(jsres.response.legislator)

     //   .map(function (res) {
     //     console.log('res:', res)
     //     return  buildCandObject(res) ;
     //   })
     //   .value();
    }
  //  .catch(function (err) {
      // console.log("XML parse error: ", err);
   //   console.log("XML parse error: ");
   // })

