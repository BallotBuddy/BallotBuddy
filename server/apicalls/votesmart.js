var rp = require('request-promise');
var _ = require('underscore');



var votesmart = module.exports;

votesmart.collectCandidatesByZip = function (zip) {
  //
  // Query info for Votesmart API = get candidates by zip
  //
  var candidates = {
    uri: 'http://api.votesmart.org/Candidates.getByZip?zip5=' + zip + '&o=JSON',
    qs: {
      key: 'f4f8f4595fdf4d3773aee9e02da81f2b'                      //process.env.Candidate_key
    },
    headers: {'User-Agent': 'request-promise'},
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
      var candidateList = jsres.candidateList.candidate;
      candidateList = candidateList.map(function (candidate) {
        candidate.picture = 'http://d229l5sflpl9cp.cloudfront.net/canphoto/' + candidate.candidateId + '.jg';
        return candidate;
      });   

      return candidateList;

    });
}

votesmart.collectCandidateDetails = function(candid){
 var options= {
    uri: 'http://api.votesmart.org/CandidateBio.getBio?candidateId='+candid +'&o=JSON',
    qs: {
       key: 'f4f8f4595fdf4d3773aee9e02da81f2b',
  //     options: 'JSON'                      //process.env.Candidate_key
     },
    headers: {'User-Agent': 'request-promise' },
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

  var returnedCandidate ={};
    returnedCandidate.candidate = candidate.candidate;
    returnedCandidate.election = candidate.election;    
    console.log(returnedCandidate)  ;   
      return returnedCandidate;
    });
}

