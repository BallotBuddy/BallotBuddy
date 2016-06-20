var rp = require('request-promise');
var _ = require('underscore');
var Promise = require("bluebird");


var api_keys = require('../../api_keys');

var votesmart = module.exports;


votesmart.checkPhoto = function (url) {
  var photo = {
    uri: url,
    qs: {},
    headers: { 'User-Agent': 'request-promise' },

  };
  return votesmart.checkPhotoStatus(photo);
}

votesmart.checkPhotoStatus = function (photo) {
  return rp(photo)
    .then(function (res) {
      return true;
    })
    .catch(function (err) {
      return false;
    })
}

votesmart.getCandidatesByLastName=function(name){
console.log ('Called getCandidatesByLastName');
 var candidates = {
    uri: 'http://api.votesmart.org/Candidates.getByLastname?lastName=' + name + '&o=JSON',
    qs: {
      key: api_keys.VOTESMART_API || process.env.VOTESMART
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetch(candidates);
}

//
// Query info for Votesmart API = get candidates by zip
//


votesmart.collectCandidatesByZip = function (zip) {

  var candidates = {
    uri: 'http://api.votesmart.org/Candidates.getByZip?zip5=' + zip + '&o=JSON',
    qs: {
      key: api_keys.VOTESMART_API || process.env.VOTESMART                   //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetch(candidates);
}

votesmart.fetch = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate info");
      return (res);
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate info: ", err.message);
    })
    .then(function (jsres) {
      if (jsres.candidateList.candidate === undefined){
        throw new Error("ZIP CODE NOT FOUND");
      }
      var candidateList = jsres.candidateList.candidate;
       candidateList = Promise.map(candidateList, function (candidate) {
        var pictureUrl = 'http://d229l5sflpl9cp.cloudfront.net/canphoto/' + candidate.candidateId + '.jpg';
        return votesmart.checkPhoto(pictureUrl)
          .then(function (result) {
          
            if (result) {
              candidate.picture = pictureUrl;
            }
            else {
              candidate.picture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJwKOmAFsBQJdt7ohopn5GJ4s6SXft9ovC-fhU9QuRZABGNwt';
            }
            return candidate;
          })
        
      });
      return candidateList;
    })
    .catch(function(err){
      return;
    });
}


votesmart.collectCandidateDetails = function (candid) {
  var options = {
    uri: 'http://api.votesmart.org/CandidateBio.getBio?candidateId=' + candid + '&o=JSON',
    qs: {
      key: api_keys.VOTESMART_API || process.env.VOTESMART   //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetchBio(options);
}

votesmart.fetchBio = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate bio info");
      return (res);
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate bio info: ", err.message);
    })
    .then(function (candidate) {
      candidate = candidate.bio;

      var returnedCandidate = {};
      returnedCandidate.candidate = candidate.candidate;
      returnedCandidate.election = candidate.election;
    
      return returnedCandidate;
    });
}


votesmart.getCandidateCampaignAddress = function (candid) {
  var options = {
    uri: 'http://api.votesmart.org/Address.getCampaign?candidateId=' + candid + '&o=JSON',
    qs: {
      key: api_keys.VOTESMART_API || process.env.VOTESMART  //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetchCandidateCampaign(options);
}



votesmart.fetchCandidateCampaign = function (option) {
  return rp(option)
    .then(function (res) {
      console.log("Successfully fetched candidate campaign addresses info");
      return res;
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate campaign addresses info: ", err.message);
    })
}

votesmart.getCandidateWebAddress = function(candid){
  var options = {
    uri: 'http://api.votesmart.org/Address.getOfficeWebAddress?candidateId=' + candid + '&o=JSON',
    qs: {
      key: api_keys.VOTESMART_API || process.env.VOTESMART  //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetchCandidateCampaign(options);
}

votesmart.fetchCandidateWebAddress = function(option){
 return rp(option)
    .then(function (res) {
      console.log("Successfully fetched candidate office web address info");
      return res;
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate office web address info: ", err.message);
    })
}